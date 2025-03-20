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
public class CryptoItemEncWriter implements ItemWriter<File> {

    private final CryptoProperties cryptoProperties;

    private static String encryptFolder;
    private static String password;
    private static String salt;

    @PostConstruct
    public void init() {
        encryptFolder = cryptoProperties.getEncryptFolder();
        password = cryptoProperties.getPassword();
        salt = cryptoProperties.getSalt();
    }

    @Override
    public void write(List<? extends File> items) {
        for (File item : items) {
            try {
                String encryptPath = getOutputEncryptPath(item);
                CryptoUtil.encryptFile(item.getAbsolutePath(), encryptPath, password, salt);
            } catch (Exception e) {
                log.error("암호화 에러 : " + e.getMessage());
            }
        }
    }

    private static String getOutputEncryptPath(File targetFile) {
        Path outputFolderPath = Paths.get(encryptFolder);
        File outputFile = new File(outputFolderPath + "/" + targetFile.getName());
        return outputFile.getAbsolutePath();
    }
}
