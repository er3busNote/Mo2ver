package com.mo2ver.web.domain.goods.converter;

import com.mo2ver.web.domain.goods.type.CategoryType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoryTypeConverter implements Converter<String, CategoryType> {

    @Override
    public CategoryType convert(String source) {
        if (source == null || source.isEmpty()) {
            throw new IllegalArgumentException("카테고리 코드가 존재하지 않습니다.");
        }
        return CategoryType.fromCode(source.charAt(0));
    }
}
