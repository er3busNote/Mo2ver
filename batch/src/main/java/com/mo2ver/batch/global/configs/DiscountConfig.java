package com.mo2ver.batch.global.configs;

import com.mo2ver.batch.domain.goods.dao.DiscountRepository;
import com.mo2ver.batch.domain.goods.dao.GoodsRepository;
import com.mo2ver.batch.domain.goods.domain.Discount;
import com.mo2ver.batch.domain.goods.domain.Goods;
import com.mo2ver.batch.domain.goods.dto.DiscountDto;
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
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import javax.sql.DataSource;

import java.sql.Connection;
import java.sql.Statement;
import java.util.Collections;

import static com.mo2ver.batch.global.configs.DiscountConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class DiscountConfig {

    public static final String JOB_NAME = "discountJob";
    public static final String STEP_NAME = "discountStep";
    private static final Integer CHUNK_SIZE = 100;
    private static final Integer TOTAL_SIZE = 44446;
    private static final String TABLE_NAME = "GD_DIS_PRC";

    @Autowired
    protected ModelMapper modelMapper;
    @Autowired
    protected GoodsRepository goodsRepository;
    @Autowired
    protected DiscountRepository discountRepository;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final DataSource dataSource;

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
    public ItemProcessor<Goods, Discount> itemProcessor() {
        return goods -> modelMapper.map(DiscountDto.toDto(goods), Discount.class);
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
    public ItemWriter<Discount> itemWriter() {
        return items -> discountRepository.saveAll(items);
    }

    @Bean
    @StepScope
    public Tasklet truncateTasklet() {
        return (contribution, chunkContext) -> {
            try (Connection connection = dataSource.getConnection()) {
                Statement statement = connection.createStatement();
                statement.executeUpdate("TRUNCATE TABLE " + TABLE_NAME);
            }
            return RepeatStatus.FINISHED;
        };
    }

    @Bean
    public Job discountJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(truncateStep())
                .next(discountStep())
                .build();
    }

    @Bean
    @JobScope
    public Step truncateStep() {
        return stepBuilderFactory.get("truncateStep")
                .tasklet(truncateTasklet())
                .build();
    }

    @Bean
    @JobScope
    public Step discountStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Discount>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(chunkListener())
                .build();
    }
}
