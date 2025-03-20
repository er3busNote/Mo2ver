package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.service.PriceService;
import com.mo2ver.batch.task.listener.ChunkListener;
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
import java.util.stream.Collectors;

import static com.mo2ver.batch.task.config.PriceSyncConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class PriceSyncConfig {

    public static final String JOB_NAME = "priceSyncJob";
    public static final String STEP_NAME = "priceSyncStep";
    private static final Integer CHUNK_SIZE = 100;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final GoodsRepository goodsRepository;
    private final PriceService priceService;
    private final ChunkListener chunkListener;

    @Bean
    public RepositoryItemReader<Goods> goodsPagingReader() {
        return new RepositoryItemReaderBuilder<Goods>()
                .name("goodsPagingReader")
                .repository(goodsRepository)
                .methodName("findAll")
                .pageSize(CHUNK_SIZE)
                .sorts(Collections.singletonMap("goodsCode", Sort.Direction.ASC))
                .build();
    }

    @Bean
    public ItemWriter<Goods> itemWriter() {
        return items -> priceService.updatePriceApplyDateForGoodsCode(items.stream()
                .map(item -> (Goods) item)
                .collect(Collectors.toList()));
    }

    @Bean
    public Job priceJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(priceStep())
                .build();
    }

    @Bean
    public Step priceStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Goods>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .writer(itemWriter())
                .listener(chunkListener)
                .build();
    }
}
