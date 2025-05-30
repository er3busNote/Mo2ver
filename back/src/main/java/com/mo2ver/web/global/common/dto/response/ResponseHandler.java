package com.mo2ver.web.global.common.dto.response;

import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import lombok.Data;
import lombok.Builder;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ResponseHandler {

    private int status;

    private String message;

    public ResponseHandler(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ResponseHandler error(ErrorResponse response) {
        return ResponseHandler.builder()
                .status(response.getStatus())
                .message(response.getMessage())
                .build();
    }
}
