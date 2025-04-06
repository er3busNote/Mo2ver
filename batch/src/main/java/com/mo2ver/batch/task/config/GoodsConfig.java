package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.dto.DataDto;
import com.mo2ver.batch.domain.goods.dto.GoodsDto;
import com.mo2ver.batch.domain.goods.service.GoodsService;
import com.mo2ver.batch.task.listener.ChunkItemListener;
import com.mo2ver.batch.task.listener.TotalCountStepListener;
import com.mo2ver.batch.task.reader.CsvFileItemReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import static com.mo2ver.batch.task.config.GoodsConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class GoodsConfig {

    public static final String JOB_NAME = "goodsJob";
    public static final String STEP_NAME = "goodsStep";
    private static final Integer CHUNK_SIZE = 100;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final ModelMapper modelMapper;
    private final GoodsRepository goodsRepository;
    private final GoodsService goodsService;
    private final CsvFileItemReader csvFileItemReader;
    private final TotalCountStepListener totalCountStepListener;
    private final ChunkItemListener chunkItemListener;

    @Bean
    public ItemProcessor<DataDto, Goods> itemProcessor() {
        return dataDto -> modelMapper.map(GoodsDto.of(
                dataDto,
                goodsService.goodsName(dataDto.getProductDisplayName()),
                goodsService.brandName(dataDto.getProductDisplayName()),
                goodsService.largeCategoryCode(dataDto.getMasterCategory()),
                goodsService.mediumCategoryCode(dataDto.getSubCategory()),
                goodsService.smallCategoryCode(dataDto.getArticleType())
        ), Goods.class);
    }

    @Bean
    public ItemWriter<Goods> itemWriter() {
        return goodsRepository::saveAll;
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
                .reader(csvFileItemReader)
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
                .allowStartIfComplete(true)
                .build();
    }
}
