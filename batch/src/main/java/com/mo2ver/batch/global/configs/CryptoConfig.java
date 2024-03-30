package com.mo2ver.batch.global.configs;

import com.mo2ver.batch.domain.goods.dto.DataDto;
import com.mo2ver.batch.global.common.properties.CryptoProperties;
import com.mo2ver.batch.global.common.properties.CsvProperties;
import com.mo2ver.batch.global.common.service.CryptoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.flow.FlowExecutionStatus;
import org.springframework.batch.core.job.flow.JobExecutionDecider;
import org.springframework.batch.core.listener.ChunkListenerSupport;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.mo2ver.batch.global.configs.CryptoConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class CryptoConfig {

    public static final String JOB_NAME = "cryptoJob";
    public static final String STEP_NAME = "cryptoStep";
    private static final Integer CHUNK_SIZE = 10;
    private static final Integer TOTAL_SIZE = 44446;

    @Autowired
    CsvProperties csvProperties;
    @Autowired
    CryptoProperties cryptoProperties;

    @Autowired
    protected CryptoService cryptoService;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    @Bean
    @StepScope
    public FlatFileItemReader<DataDto> itemReader() {
        Path path = Paths.get(csvProperties.getFilepath());
        FileSystemResource fileSystemResource = new FileSystemResource(path.toFile());
        return new FlatFileItemReaderBuilder<DataDto>()
                .name("dataDtoItemReader")
                .encoding("UTF-8")
                .resource(fileSystemResource)
                .delimited()
                .delimiter(",")
                .names("id", "gender", "masterCategory", "subCategory", "articleType", "baseColour", "season", "year", "usage", "productDisplayName")
                .linesToSkip(1)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<DataDto>() {{
                    setTargetType(DataDto.class);
                }})
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<DataDto, File> itemEncProcessor() {
        return item -> getInputOriginPath(item.getId());
    }

    @Bean
    @StepScope
    public ItemProcessor<DataDto, File> itemDecProcessor() {
        return item -> getInputEncryptPath(item.getId());
    }

    @Bean
    @StepScope
    public ItemWriter<File> itemEncWriter() {
        return items -> items.forEach(item -> {
            try {
                cryptoService.encryptFile(item.getAbsolutePath(), getOutputEncryptPath(item), cryptoProperties.getPassword(), cryptoProperties.getSalt());
            } catch (Exception e) {
                log.error("암호화 에러 : " + e.getMessage());
            }
        });
    }

    @Bean
    @StepScope
    public ItemWriter<File> itemDecWriter() {
        return items -> items.forEach(item -> {
            try {
                cryptoService.decryptFile(item.getAbsolutePath(), getOutputDecryptPath(item), cryptoProperties.getPassword(), cryptoProperties.getSalt());
            } catch (Exception e) {
                log.error("복호화 에러 : " + e.getMessage());
            }
        });
    }

    @Bean
    @StepScope
    public ChunkListener chunkListener() {
        return new ChunkListenerSupport() {
            @Override
            public void beforeChunk(ChunkContext context) {
                context.getStepContext().getStepExecution().getExecutionContext().putInt("totalItemCount", TOTAL_SIZE);
            }

            @Override
            public void afterChunk(ChunkContext context) {
                int currentItemCount = context.getStepContext().getStepExecution().getReadCount();
                int totalItemCount = context.getStepContext().getStepExecution().getExecutionContext().getInt("totalItemCount");

                double progress = (double) currentItemCount / totalItemCount * 100;
                log.info("Progress: " + progress + "%");
            }
        };
    }

    @Bean
    public Job cryptoJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(cryptoReadyStep(null))
                .next(decider())
                .from(decider()).on("ENCRYPTION").to(cryptoEncStep())
                .from(decider()).on("DECRYPTION").to(cryptoDecStep())
                .end()
                .build();
    }

    @Bean
    @JobScope
    public Step cryptoReadyStep(@Value("#{jobParameters[requestDate]}") String requestDate) {
        return stepBuilderFactory.get("cryptoReadyStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info("암/복호화 환경이 준비되었습니다.");
                    log.info(">>>>> requestDate = {}", requestDate);
                    return RepeatStatus.FINISHED;
                }).build();
    }

    @Bean
    @JobScope
    public Step cryptoEncStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<DataDto, File>chunk(CHUNK_SIZE)
                .reader(itemReader())
                .processor(itemEncProcessor())
                .writer(itemEncWriter())
                .listener(chunkListener())
                .build();
    }

    @Bean
    @JobScope
    public Step cryptoDecStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<DataDto, File>chunk(CHUNK_SIZE)
                .reader(itemReader())
                .processor(itemDecProcessor())
                .writer(itemDecWriter())
                .listener(chunkListener())
                .build();
    }

    @Bean
    public JobExecutionDecider decider() {
        return (jobExecution, stepExecution) -> {
            String condition = jobExecution.getJobParameters().getString("type");

            if (condition != null && condition.equals("encrypt")) {
                return new FlowExecutionStatus("ENCRYPTION");
            } else if (condition != null && condition.equals("decrypt")) {
                return new FlowExecutionStatus("DECRYPTION");
            } else {
                throw new IllegalArgumentException("파라미터가 잘못 되었습니다.");
            }
        };
    }

    private File getInputOriginPath(String targetId) {
        Path inputFolderPath = Paths.get(cryptoProperties.getOriginFolder());
        return new File(inputFolderPath + "/" + targetId + ".jpg");
    }

    private File getInputEncryptPath(String targetId) {
        Path inputFolderPath = Paths.get(cryptoProperties.getEncryptFolder());
        return new File(inputFolderPath + "/" + targetId + ".jpg");
    }

    private String getOutputEncryptPath(File targetFile) {
        Path outputFolderPath = Paths.get(cryptoProperties.getEncryptFolder());
        File outputFile = new File(outputFolderPath + "/" + targetFile.getName());
        return outputFile.getAbsolutePath();
    }

    private String getOutputDecryptPath(File targetFile) {
        Path outputFolderPath = Paths.get(cryptoProperties.getDecryptFolder());
        File outputFile = new File(outputFolderPath + "/" + targetFile.getName());
        return outputFile.getAbsolutePath();
    }
}
