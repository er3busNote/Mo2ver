package com.mo2ver.web.domain.search.dto;

import com.mo2ver.web.domain.search.type.Operation;
import com.mo2ver.web.domain.search.type.SearchColumn;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterInfo {
    private String column;          // 엔티티 속성명(컬럼)
    private Object value;           // 값
    private Operation operation;    // 연산
    private boolean isJoin;         // Join 여부

    public static <T> FilterInfo of(SearchColumn column, T value, boolean isJoin) {
        FilterInfo.FilterInfoBuilder builder = FilterInfo.builder().isJoin(isJoin);
        switch (column) {
            case GOODS_NAME:
                return builder
                        .column(column.toCamelCase())
                        .value(String.format("%%%s%%", value))
                        .operation(Operation.LIKE)
                        .build();
            case MEMBER_NO:
                return builder
                        .column(column.toCamelCase())
                        .value(value)
                        .operation(Operation.EQUAL)
                        .build();
            case MIN_PRICE:
                return builder
                        .column("salePrice")
                        .value(value)
                        .operation(Operation.GTE)
                        .build();
            case MAX_PRICE:
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
