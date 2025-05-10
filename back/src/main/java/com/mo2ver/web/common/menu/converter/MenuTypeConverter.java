package com.mo2ver.web.common.menu.converter;

import com.mo2ver.web.common.menu.type.MenuType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MenuTypeConverter implements Converter<String, MenuType> {

    @Override
    public MenuType convert(String source) {
        if (source == null || source.isEmpty()) {
            throw new IllegalArgumentException("메뉴 코드가 존재하지 않습니다.");
        }
        try {
            Integer code = Integer.parseInt(source);
            return MenuType.fromCode(code);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("유효하지 않은 코드 형식 : " + source, e);
        }
    }
}
