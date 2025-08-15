package com.mo2ver.web.global.error.dto.response;

import com.mo2ver.web.global.error.type.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import org.springframework.stereotype.Component;

@Component
public class ErrorHandler {

    /**
     * 예외 객체의 클래스 이름을 반환
     * @param exception 예외 객체
     * @return 예외 클래스 이름 (예: "NullPointerException")
     */
    public static String getExceptionClassName(Exception exception) {
        if (exception == null) {
            return "UnknownException";
        }
        return exception.getClass().getSimpleName();
    }

    public ErrorResponse buildError(ErrorCode errorCode, ErrorInfo errorMessage) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .status(errorCode.getStatus())
                .message(errorCode.getMessage())
                .errors(errorMessage)
                .build();
    }
}
