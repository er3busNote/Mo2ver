package com.mo2ver.web.global.common.utils;

import com.mo2ver.web.global.common.setting.ImagesSetting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@RequiredArgsConstructor
public class FileUtil {

    private static final String PROJECT_DIRECTORY = System.getProperty("user.dir");

    private final ImagesSetting imagesSetting;

    private static String filepath;

    @PostConstruct
    public void init() {
        filepath = imagesSetting.getFilepath();
    }

    public static Path getUploadDirectory(String directoryPath) {
        Path folderPath = Paths.get(filepath);
        Path uploadDirectory = folderPath.resolve(directoryPath);
        createDirectory(uploadDirectory.toString()); // 업로드할 디렉토리가 없으면 생성
        return uploadDirectory;
    }

    public static File getTargetFile(String targetFilePath) {
        return new File(PROJECT_DIRECTORY + "/" + targetFilePath);
    }

    public static String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(lastDotIndex + 1);
        }
        return "";
    }

    public static String removeFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(0, lastDotIndex);
        }
        return fileName;
    }

    private static void createDirectory(String uploadDirectory) {
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }
}
