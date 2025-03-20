package com.mo2ver.batch.task.reader;

import com.mo2ver.batch.common.properties.CsvProperties;
import com.mo2ver.batch.domain.goods.dto.DataDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Component
@RequiredArgsConstructor
public class CsvFileItemReader implements ItemReader<DataDto> {

    private final CsvProperties csvProperties;

    private static FlatFileItemReader<DataDto> flatFileItemReader;
    private static String filepath;

    @PostConstruct
    public void init() {
        filepath = csvProperties.getFilepath();
        flatFileItemReader = createFlatFileItemReader();
        try {
            ExecutionContext executionContext = new ExecutionContext();
            flatFileItemReader.open(executionContext);  // open() 호출
        } catch (Exception e) {
            throw new RuntimeException("FlatFileItemReader open 실패", e);
        }
    }

    @StepScope
    public FlatFileItemReader<DataDto> createFlatFileItemReader() {
        Path path = Paths.get(filepath);
        FileSystemResource fileSystemResource = new FileSystemResource(path.toFile());
        FlatFileItemReader<DataDto> reader = new FlatFileItemReaderBuilder<DataDto>()
                .name("dataDtoItemReader")
                .encoding("UTF-8")
                .resource(fileSystemResource)
                .delimited()
                .delimiter(",")
                .names("id", "gender", "masterCategory", "subCategory", "articleType", "baseColour", "season", "year", "usage", "productDisplayName")
                .linesToSkip(1)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<DataDto>() {{
                    setTargetType(DataDto.class);
                }})
                .build();

        try {
            reader.afterPropertiesSet(); // Reader 설정 완료
            log.info("FlatFileItemReader 생성 완료");
        } catch (Exception e) {
            throw new RuntimeException("FlatFileItemReader 설정 오류", e);
        }

        return reader;
    }

    @Override
    public DataDto read() throws Exception {
        return flatFileItemReader.read();
    }
}