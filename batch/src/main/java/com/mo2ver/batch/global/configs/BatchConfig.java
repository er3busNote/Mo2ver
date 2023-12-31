package com.mo2ver.batch.global.configs;

import com.mo2ver.batch.domain.goods.task.GoodsTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class BatchConfig {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;
    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    private final GoodsTask goodsTask;

    public BatchConfig (GoodsTask goodsTask) {
        this.goodsTask = goodsTask;
    }

    @Bean
    public Job goodsJob() {
        return jobBuilderFactory.get("goodsJob")
                .start(goodsStep())
                .build();
    }

    @Bean
    public Step goodsStep() {
        return stepBuilderFactory.get("goodsStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info(">>>>> This is goodsStep");
                    this.goodsTask.insertGoods();
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
