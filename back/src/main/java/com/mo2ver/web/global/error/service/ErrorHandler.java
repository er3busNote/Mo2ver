package com.mo2ver.web.global.error.service;

import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ErrorHandler {

    public ErrorResponse buildError(ErrorCode errorCode, HashMap<String, Object> errorMessage) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .status(errorCode.getStatus())
                .message(errorCode.getMessage())
                .errors(errorMessage)
                .build();
    }
}
