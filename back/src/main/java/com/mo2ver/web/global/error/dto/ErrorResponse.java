package com.mo2ver.web.global.error.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Builder
@Getter
public class ErrorResponse {

    private String message;
    private String code;
    private int status;
    private HashMap<String, Object> errors;
}
