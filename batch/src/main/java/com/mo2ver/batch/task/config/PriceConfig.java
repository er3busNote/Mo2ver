package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.domain.goods.repository.PriceRepository;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.entity.Price;
import com.mo2ver.batch.domain.goods.dto.PriceDto;
import com.mo2ver.batch.task.listener.ChunkListener;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Collections;

import static com.mo2ver.batch.task.config.PriceConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class PriceConfig {

    public static final String JOB_NAME = "priceJob";
    public static final String STEP_NAME = "priceStep";
    private static final Integer CHUNK_SIZE = 100;
    private static final String TABLE_NAME = "GD_PRC";

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final DataSource dataSource;
    private final ModelMapper modelMapper;
    private final GoodsRepository goodsRepository;
    private final PriceRepository priceRepository;
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
    public ItemProcessor<Goods, Price> itemProcessor() {
        return goods -> modelMapper.map(PriceDto.toDto(goods), Price.class);
    }

    @Bean
    public ItemWriter<Price> itemWriter() {
        return priceRepository::saveAll;
    }

    @Bean
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
    public Job priceJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(truncateStep())
                .next(priceStep())
                .build();
    }

    @Bean
    public Step truncateStep() {
        return stepBuilderFactory.get("truncateStep")
                .tasklet(truncateTasklet())
                .build();
    }

    @Bean
    public Step priceStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Price>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(chunkListener)
                .build();
    }
}
