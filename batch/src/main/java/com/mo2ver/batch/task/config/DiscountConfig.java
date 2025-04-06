package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.repository.DiscountRepository;
import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.domain.goods.entity.Discount;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.dto.DiscountDto;
import com.mo2ver.batch.task.listener.ChunkItemListener;
import com.mo2ver.batch.task.listener.TotalCountStepListener;
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

import static com.mo2ver.batch.task.config.DiscountConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class DiscountConfig {

    public static final String JOB_NAME = "discountJob";
    public static final String STEP_NAME = "discountStep";
    private static final Integer CHUNK_SIZE = 100;
    private static final String TABLE_NAME = "GD_DIS_PRC";

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final DataSource dataSource;
    private final ModelMapper modelMapper;
    private final GoodsRepository goodsRepository;
    private final DiscountRepository discountRepository;
    private final TotalCountStepListener totalCountStepListener;
    private final ChunkItemListener chunkItemListener;

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
    public ItemProcessor<Goods, Discount> itemProcessor() {
        return goods -> modelMapper.map(DiscountDto.of(goods), Discount.class);
    }

    @Bean
    public ItemWriter<Discount> itemWriter() {
        return discountRepository::saveAll;
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
    public Job discountJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(truncateStep())
                .next(discountStep())
                .build();
    }

    @Bean
    public Step truncateStep() {
        return stepBuilderFactory.get("truncateStep")
                .tasklet(truncateTasklet())
                .build();
    }

    @Bean
    public Step discountStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Discount>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
                .build();
    }
}
