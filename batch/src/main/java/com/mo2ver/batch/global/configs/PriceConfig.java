package com.mo2ver.batch.global.configs;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.mo2ver.batch.global.configs.PriceConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class PriceConfig {

    public static final String JOB_NAME = "priceJob";
    public static final String STEP_NAME = "priceStep";

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

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
                .tasklet((contribution, chunkContext) -> {
                    log.info(">>>>> This is goodsStep");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
