package com.mo2ver.web.global.error.dto.response;

import com.mo2ver.web.global.error.dto.ErrorInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Builder
@Getter
public class ErrorResponse {

    private String message;
    private String code;
    private int status;
    private ErrorInfo errors;
}
