package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.task.listener.ChunkItemListener;
import com.mo2ver.batch.task.listener.TotalCountStepListener;
import com.mo2ver.batch.task.processor.KeywordItemProcessor;
import com.mo2ver.batch.task.reader.KeywordItemReader;
import com.mo2ver.batch.task.writer.KeywordItemWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.util.Collections;

import static com.mo2ver.batch.task.config.KeywordConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class KeywordConfig {

    public static final String JOB_NAME = "keywordJob";
    public static final String STEP_NAME = "keywordStep";
    private static final Integer CHUNK_SIZE = 100;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final GoodsRepository goodsRepository;
    private final KeywordItemReader keywordItemReader;
    private final KeywordItemProcessor keywordItemProcessor;
    private final KeywordItemWriter keywordItemWriter;
    private final TotalCountStepListener totalCountStepListener;
    private final ChunkItemListener chunkItemListener;

    @Bean
    public RepositoryItemReader<Goods> goodsPagingReader() {
        return new RepositoryItemReaderBuilder<Goods>()
                .name("goodsKeywordPagingReader")
                .repository(goodsRepository)
                .methodName("findByKeywordIsNull")
                .pageSize(CHUNK_SIZE)
                .sorts(Collections.singletonMap("goodsCode", Sort.Direction.ASC))
                .build();
    }

    @Bean
    public ItemWriter<Goods> itemWriter() {
        return goodsRepository::saveAll;
    }

    @Bean
    public Job keywordJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(keywordStep())
                .build();
    }

    @Bean
    public Step keywordStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<String, Goods>chunk(CHUNK_SIZE)
                .reader(keywordItemReader)
                .processor(keywordItemProcessor)
                .writer(keywordItemWriter)
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
                .allowStartIfComplete(true)
                .build();
    }
}
