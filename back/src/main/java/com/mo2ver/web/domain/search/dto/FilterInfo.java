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
        FilterInfo.FilterInfoBuilder builder = FilterInfo.builder().isJoin(isJoin);
        switch (column) {
            case "goodsName":
                return builder
                        .column(column)
                        .value(String.format("%%%s%%", value))
                        .operation(Operation.LIKE)
                        .build();
            case "minPrice":
                return builder
                        .column("salePrice")
                        .value(value)
                        .operation(Operation.GTE)
                        .build();
            case "maxPrice":
                return builder
                        .column("salePrice")
                        .value(value)
                        .operation(Operation.LTE)
                        .build();
            default:
                return builder.build();
        }
    }
}
