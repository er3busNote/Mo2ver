package com.mo2ver.web.domain.goods.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GoodsImageValidator implements Validator  {

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "image/jpeg",
            "image/png"
    );

    @Override
    public boolean supports(Class<?> clazz) {
        return List.class.isAssignableFrom(clazz) && containsMultipartFile(clazz);
    }

    private boolean containsMultipartFile(Class<?> clazz) {
        if (clazz == null) {
            return false;
        }

        if (clazz.equals(MultipartFile.class)) {
            return true;
        }

        return containsMultipartFile(clazz.getSuperclass());
    }

    @Override
    public void validate(Object target, Errors errors) {
        List<MultipartFile> files = (List<MultipartFile>) target;

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);

            if (file.isEmpty()) {
                errors.rejectValue("goodsImg[" + i + "]", "fileEmpty", "파일이 존재하지 않습니다");
                continue;
            }

            if (!isImageContentType(file)) {
                String allowedTypes = getAllowedContentTypesAsString();
                errors.rejectValue("goodsImg[" + i + "]", "invalidType", "지원되지 않는 파일형식입니다. 허용된 파일타입 : " + allowedTypes);
            }
        }
    }

    private boolean isImageContentType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && ALLOWED_CONTENT_TYPES.contains(contentType);
    }

    private String getAllowedContentTypesAsString() {
        return ALLOWED_CONTENT_TYPES.stream().collect(Collectors.joining(", "));
    }
}
