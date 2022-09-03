package com.mo2ver.master.global.error.application;

import com.mo2ver.master.global.error.domain.ErrorCode;
import com.mo2ver.master.global.error.presentation.ErrorResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ErrorService {

    public ErrorResponse buildError(ErrorCode errorCode, HashMap<String, Object> errorMessage) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .status(errorCode.getStatus())
                .message(errorCode.getMessage())
                .errors(errorMessage)
                .build();
    }
}
