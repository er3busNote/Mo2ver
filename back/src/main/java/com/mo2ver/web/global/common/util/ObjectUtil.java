package com.mo2ver.web.global.common.util;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;

@Slf4j
public class ObjectUtil {

    public static boolean nonAllFieldsNull(Object obj) {
        return !isAllFieldsNull(obj);
    }

    private static boolean isAllFieldsNull(Object obj) {
        if (obj == null) {
            return true;
        }

        Field[] fields = obj.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);  // private 필드에도 접근 가능하도록 설정

            try {
                Object value = field.get(obj);
                if (value != null) {
                    return false;
                }
            } catch (IllegalAccessException e) {
                log.error(e.getMessage());
            }
        }
        return true;
    }
}
