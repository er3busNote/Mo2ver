package com.mo2ver.web.global.error.type;

import lombok.Getter;

@Getter
public enum ErrorCode {

    METHOD_NOT_ALLOWED("CM_001", "Method가 올바르지 않습니다.", 405),
    UNSUPPORTED_MEDIA_TYPE("CM_002", "ContentType이 올바르지 않습니다.", 415),
    HANDLE_ACCESS_DENIED("CM_003", "파라미터가 올바르지 않습니다.", 400),
    INPUT_KEY_INVALID("CM_004", "입력 Key 값이 올바르지 않습니다.", 400),
    INPUT_VALUE_INVALID("CM_005", "입력 Value 값이 올바르지 않습니다.", 400),
    JSON_MAPPING_INVALID("CM_006", "JSON 포멧이 일치하지 않습니다.", 400),
    FILETYPE_MAPPING_INVALID("CM_007", "지원되지 않는 파일타입입니다.", 400),
    REPOSITORY_MAPPING_INVALID("CM_008", "Repository 포멧이 일치하지 않습니다.", 400),
    TOSS_PAYMENT_ERROR("CM_009", "토스 페이먼츠 에러", 400),
    DATA_MOT_FOUND("CM_010", "DATA가 존재하지 않습니다.", 404),
    SIGNUP_USERNAME_VALUE_INVALID("CM_011", "해당 이름이 이미 존재합니다.", 422),
    SIGNUP_EMAIL_VALUE_INVALID("CM_012", "해당 아이디가 이미 존재합니다.", 422),
    INTERNAL_SERVER_ERROR("CM_100", "서버 에러.", 500),
    SQL_QUERY_INVALID("CM_101", "SQL 쿼리상의 문제가 발생했습니다.", 500),;

    private final String code;
    private final String message;
    private final int status;

    ErrorCode(String code, String message, int status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}
