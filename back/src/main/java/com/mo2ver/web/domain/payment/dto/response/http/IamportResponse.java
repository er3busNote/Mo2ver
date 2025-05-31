package com.mo2ver.web.domain.payment.dto.response.http;

import lombok.Data;

@Data
public class IamportResponse {

    private Response response;

    @Data
    public static class Response {
        private String access_token;
        private Number amount;
        private String status;
    }
}
