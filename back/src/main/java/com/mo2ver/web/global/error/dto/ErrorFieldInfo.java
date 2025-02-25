package com.mo2ver.web.global.error.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.validation.FieldError;

@Getter
@Builder
public class ErrorFieldInfo {

    private String field;
    private Object rejectedValue;
    private String reason;

    public static ErrorFieldInfo of(FieldError fieldError) {
        return ErrorFieldInfo.builder()
                .field(fieldError.getField())
                .rejectedValue(fieldError.getRejectedValue())
                .reason(fieldError.getDefaultMessage())
                .build();
    }
}
