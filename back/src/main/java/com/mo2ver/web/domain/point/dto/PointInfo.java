package com.mo2ver.web.domain.point.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.util.Optional;

@Data
public class PointInfo {

    private String pointNo;
    private Integer pointGiven;
    private Integer pointUseSum;

    @QueryProjection
    public PointInfo(String pointNo, Integer pointGiven, Integer pointUseSum) {
        this.pointNo = pointNo;
        this.pointGiven = pointGiven;
        this.pointUseSum = Optional.ofNullable(pointUseSum).orElse(0);
    }
}
