package com.mo2ver.batch.global.configs;

import com.mo2ver.batch.domain.goods.dao.GoodsRepository;
import com.mo2ver.batch.domain.goods.domain.Goods;
import com.mo2ver.batch.domain.goods.dto.DataDto;
import com.mo2ver.batch.domain.goods.dto.GoodsDto;
import com.mo2ver.batch.domain.goods.service.GoodsService;
import com.mo2ver.batch.global.common.properties.CsvProperties;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.listener.ChunkListenerSupport;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.FileSystemResource;

import java.nio.file.Path;
import java.nio.file.Paths;

import static com.mo2ver.batch.global.configs.GoodsConfig.JOB_NAME;

@Slf4j
@Configuration
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class GoodsConfig {

    public static final String JOB_NAME = "goodsJob";
    public static final String STEP_NAME = "goodsStep";
    private static final Integer CHUNK_SIZE = 100;
    private static final Integer TOTAL_SIZE = 44446;

    @Autowired
    CsvProperties csvProperties;
    @Autowired
    protected ModelMapper modelMapper;
    @Autowired
    protected GoodsRepository goodsRepository;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final GoodsService goodsService;

    public GoodsConfig(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory, GoodsService goodsService) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
        this.goodsService = goodsService;
    }

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
    public ItemProcessor<DataDto, Goods> itemProcessor() {
        return dataDto -> modelMapper.map(GoodsDto.toDto(
                dataDto,
                goodsService.goodsName(dataDto.getProductDisplayName()),
                goodsService.brandName(dataDto.getProductDisplayName()),
                goodsService.largeCategoryCode(dataDto.getMasterCategory()),
                goodsService.mediumCategoryCode(dataDto.getSubCategory()),
                goodsService.smallCategoryCode(dataDto.getArticleType())
        ), Goods.class);
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
    @StepScope
    public ItemWriter<Goods> itemWriter() {
        return items -> goodsRepository.saveAll(items);
    }

    @Bean
    @Profile("development")    // → 개발환경(development)
    public Job goodsJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(goodsStep())
                .build();
    }

    @Bean
    public Step goodsStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<DataDto, Goods>chunk(CHUNK_SIZE)
                .reader(itemReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(chunkListener())
                .allowStartIfComplete(true)
                .build();
    }
}
