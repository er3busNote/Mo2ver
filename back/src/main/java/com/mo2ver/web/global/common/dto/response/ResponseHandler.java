package com.mo2ver.web.global.common.dto.response;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ResponseHandler {

    private int status;

    private String message;

    public ResponseHandler(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
