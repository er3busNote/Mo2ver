package com.mo2ver.batch.task.config;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import com.mo2ver.batch.domain.goods.repository.ImageRepository;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.entity.Image;
import com.mo2ver.batch.domain.goods.dto.ImageDto;
import com.mo2ver.batch.task.listener.ChunkItemListener;
import com.mo2ver.batch.task.listener.TotalCountStepListener;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.util.Collections;

import static com.mo2ver.batch.task.config.ImageConfig.JOB_NAME;

@Slf4j
@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "job.name", havingValue = JOB_NAME)
public class ImageConfig {

    public static final String JOB_NAME = "imageJob";
    public static final String STEP_NAME = "imageStep";
    private static final Integer CHUNK_SIZE = 100;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final ModelMapper modelMapper;
    private final GoodsRepository goodsRepository;
    private final ImageRepository imageRepository;
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
    public ItemProcessor<Goods, Image> itemProcessor() {
        return goods -> modelMapper.map(ImageDto.of(goods), Image.class);
    }

    @Bean
    public ItemWriter<Image> itemWriter() {
        return imageRepository::saveAll;
    }

    @Bean
    public Job imageJob() {
        return jobBuilderFactory.get(JOB_NAME)
                .start(imageStep())
                .build();
    }

    @Bean
    public Step imageStep() {
        return stepBuilderFactory.get(STEP_NAME)
                .<Goods, Image>chunk(CHUNK_SIZE)
                .reader(goodsPagingReader())
                .processor(itemProcessor())
                .writer(itemWriter())
                .listener(totalCountStepListener)
                .listener(chunkItemListener)
                .build();
    }
}
