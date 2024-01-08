package com.mo2ver.master.domain.goods.dto;

import com.mo2ver.master.domain.goods.domain.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Slf4j
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {

    private String base64Image;

    private Character basicImageYesNo;

    private Integer sortSequence;

    private Character useYesNo;

    public static ImageDto toDTO(Image image, String filepath) {

        String base64Image = "";
        Path folderPath = Paths.get(filepath);
        Path imagePath = folderPath.resolve(String.valueOf(image.getGoodsImageAttachFile()) + '.' + image.getGoodsImageExtension());
        try {
            byte[] fileContent = Files.readAllBytes(imagePath);
            base64Image = Base64.getEncoder().encodeToString(fileContent);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return ImageDto.builder()
                .base64Image(base64Image)
                .basicImageYesNo(image.getBasicImageYesNo())
                .sortSequence(image.getSortSequence())
                .useYesNo(image.getUseYesNo())
                .build();
    }
}
