package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.dto.DataDto;
import com.mo2ver.batch.task.listener.ChunkItemListener;
import com.mo2ver.batch.task.listener.TotalCountStepListener;
import com.mo2ver.batch.task.processor.CryptoItemDecProcessor;
import com.mo2ver.batch.task.processor.CryptoItemEncProcessor;
import com.mo2ver.batch.task.reader.CsvFileItemReader;
import com.mo2ver.batch.task.writer.CryptoItemDecWriter;
import com.mo2ver.batch.task.writer.CryptoItemEncWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.flow.FlowExecutionStatus;
import org.springframework.batch.core.job.flow.JobExecutionDecider;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

import static com.mo2ver.batch.task.config.CryptoConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class CryptoConfig {

    public static final String JOB_NAME = "cryptoJob";
    public static final String STEP_NAME = "cryptoStep";
    private static final Integer CHUNK_SIZE = 10;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final CsvFileItemReader csvFileItemReader;
    private final CryptoItemEncProcessor cryptoItemEncProcessor;
    private final CryptoItemDecProcessor cryptoItemDecProcessor;
    private final CryptoItemEncWriter cryptoItemEncWriter;
    private final CryptoItemDecWriter cryptoItemDecWriter;
    private final TotalCountStepListener totalCountStepListener;
    private final ChunkItemListener chunkItemListener;

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
    public Step cryptoEncStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<DataDto, File>chunk(CHUNK_SIZE)
                .reader(csvFileItemReader)
                .processor(cryptoItemEncProcessor)
                .writer(cryptoItemEncWriter)
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
                .build();
    }

    @Bean
    public Step cryptoDecStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<DataDto, File>chunk(CHUNK_SIZE)
                .reader(csvFileItemReader)
                .processor(cryptoItemDecProcessor)
                .writer(cryptoItemDecWriter)
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
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
}
