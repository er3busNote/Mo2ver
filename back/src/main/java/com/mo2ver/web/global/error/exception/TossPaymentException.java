package com.mo2ver.web.global.error.exception;

import lombok.Getter;

@Getter
public class TossPaymentException extends RuntimeException {
    private final int statusCode;
    private final String responseBody;

    public TossPaymentException(String message, int statusCode, String responseBody) {
        super(message);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
