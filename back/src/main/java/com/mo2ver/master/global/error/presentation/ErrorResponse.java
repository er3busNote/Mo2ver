package com.mo2ver.master.global.error.presentation;

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
