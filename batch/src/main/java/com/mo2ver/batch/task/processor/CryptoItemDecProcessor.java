package com.mo2ver.batch.task.processor;

import com.mo2ver.batch.common.properties.CryptoProperties;
import com.mo2ver.batch.domain.goods.dto.DataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@RequiredArgsConstructor
public class CryptoItemDecProcessor implements ItemProcessor<DataDto, File> {

    private final CryptoProperties cryptoProperties;

    private static String folderPath;

    @PostConstruct
    public void init() {
        folderPath = cryptoProperties.getOriginFolder();
    }

    @Override
    public File process(DataDto item) throws Exception {
        return getInputEncryptPath(item.getId());
    }

    private static File getInputEncryptPath(String targetId) {
        Path inputFolderPath = Paths.get(folderPath);
        return new File(inputFolderPath + "/" + targetId + ".jpg");
    }
}
