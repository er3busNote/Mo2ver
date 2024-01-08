package com.mo2ver.batch.global.configs;

import com.mo2ver.batch.domain.goods.dao.GoodsRepository;
import com.mo2ver.batch.domain.goods.domain.Goods;
import com.mo2ver.batch.domain.goods.service.PriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.ChunkListener;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.listener.ChunkListenerSupport;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.stream.Collectors;

import static com.mo2ver.batch.global.configs.PriceSyncConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class PriceSyncConfig {

    public static final String JOB_NAME = "priceSyncJob";
    public static final String STEP_NAME = "priceSyncStep";
    private static final Integer CHUNK_SIZE = 100;
    private static final Integer TOTAL_SIZE = 44446;

    @Autowired
    protected GoodsRepository goodsRepository;
    @Autowired
    protected PriceService priceService;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    @Bean
    @StepScope
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
    @JobScope
    public Step priceStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Goods>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .writer(itemWriter())
                .listener(chunkListener())
                .build();
    }
}
