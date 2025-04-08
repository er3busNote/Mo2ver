package com.mo2ver.web.domain.search.dto;

public enum Operation {
    GT, // GREATER_THAN
    LT, // LESS_THAN
    GTE, // GREATER_THAN_EQUAL
    LTE, // LESS_THAN_EQUAL
    NOT_EQUAL,
    EQUAL,
    LIKE,
    IN,
    NOT_IN,
    IS_NULL,
    IS_NOT_NULL
}
