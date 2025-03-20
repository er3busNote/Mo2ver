package com.mo2ver.batch.task.writer;

import com.mo2ver.batch.common.properties.CryptoProperties;
import com.mo2ver.batch.common.utils.CryptoUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CryptoItemDecWriter implements ItemWriter<File> {

    private final CryptoProperties cryptoProperties;

    private static String decryptFolder;
    private static String password;
    private static String salt;

    @PostConstruct
    public void init() {
        decryptFolder = cryptoProperties.getDecryptFolder();
        password = cryptoProperties.getPassword();
        salt = cryptoProperties.getSalt();
    }

    @Override
    public void write(List<? extends File> items) {
        for (File item : items) {
            try {
                String decryptPath = getOutputDecryptPath(item);
                CryptoUtil.decryptFile(item.getAbsolutePath(), decryptPath, password, salt);
            } catch (Exception e) {
                log.error("복호화 에러 : " + e.getMessage());
            }
        }
    }

    private static String getOutputDecryptPath(File targetFile) {
        Path outputFolderPath = Paths.get(decryptFolder);
        File outputFile = new File(outputFolderPath + "/" + targetFile.getName());
        return outputFile.getAbsolutePath();
    }
}
