package com.mo2ver.web.global.common.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ResponseDto {

    private int status;

    private String message;

    public ResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
