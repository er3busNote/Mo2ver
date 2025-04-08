package com.mo2ver.web.domain.search.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterInfo {
    private String column;          // 엔티티 속성명(컬럼)
    private Object value;           // 값
    private Operation operation;    // 연산
    private boolean isJoin;         // Join 여부

    public static <T> FilterInfo of(String column, T value, boolean isJoin) {
        switch (column) {
            case "goodsName":
                return FilterInfo.builder()
                        .column(column)
                        .value(String.format("%%%s%%", value))
                        .operation(Operation.LIKE)
                        .isJoin(isJoin)
                        .build();
            case "minPrice":
                return FilterInfo.builder()
                        .column("salePrice")
                        .value(value)
                        .operation(Operation.GTE)
                        .isJoin(isJoin)
                        .build();
            case "maxPrice":
                return FilterInfo.builder()
                        .column("salePrice")
                        .value(value)
                        .operation(Operation.LTE)
                        .isJoin(isJoin)
                        .build();
            default:
                return FilterInfo.builder()
                        .build();
        }
    }
}
