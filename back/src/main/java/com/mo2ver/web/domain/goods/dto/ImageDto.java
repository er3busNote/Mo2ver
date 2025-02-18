package com.mo2ver.web.domain.goods.dto;

import com.mo2ver.web.domain.goods.domain.GoodsImage;
import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
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
    private String goodsImageAttachFile;
    private String goodsImageExtension;
    private Character basicImageYesNo;
    private Integer sortSequence;
    private Character useYesNo;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public static ImageDto of(GoodsImage goodsImage) {
        return ImageDto.builder()
                .goodsImageAttachFile(getEncryptor(goodsImage.getGoodsImageAttachFile()))
                .goodsImageExtension(goodsImage.getGoodsImageExtension())
                .basicImageYesNo(goodsImage.getBasicImageYesNo())
                .sortSequence(goodsImage.getSortSequence())
                .useYesNo(goodsImage.getUseYesNo())
                .build();
    }

    public static ImageDto of(GoodsImage goodsImage, String filepath) {

        String base64Image = "";
        Path folderPath = Paths.get(filepath);
        Path imagePath = folderPath.resolve(String.valueOf(goodsImage.getGoodsImageAttachFile()) + '.' + goodsImage.getGoodsImageExtension());
        try {
            byte[] fileContent = Files.readAllBytes(imagePath);
            base64Image = Base64.getEncoder().encodeToString(fileContent);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return ImageDto.builder()
                .base64Image(base64Image)
                .basicImageYesNo(goodsImage.getBasicImageYesNo())
                .sortSequence(goodsImage.getSortSequence())
                .useYesNo(goodsImage.getUseYesNo())
                .build();
    }
}
