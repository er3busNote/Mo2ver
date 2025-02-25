package com.mo2ver.web.global.error.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorFieldTypeInfo {

    private String fieldType;
    private Object fieldValue;

    public static ErrorFieldTypeInfo of(String fieldType) {
        return ErrorFieldTypeInfo.builder()
                .fieldType(fieldType)
                .build();
    }

    public static ErrorFieldTypeInfo of(String fieldType, Object fieldValue) {
        return ErrorFieldTypeInfo.builder()
                .fieldType(fieldType)
                .fieldValue(fieldValue)
                .build();
    }
}
