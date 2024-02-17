package com.mo2ver.web.domain.event.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class EventDetailDto {

    private String subject;

    private Date eventStartDate;

    private Date eventEndDate;

    private Integer goodsImageAttachFile;

    private String goodsImageExtension;

    private String goodsCode;

    private String goodsName;

    private String goodsBrand;

    private String goodsGender;

    private String goodsYear;

    private BigDecimal supplyPrice;

    private BigDecimal salePrice;

    private Integer sortSequence;

    @QueryProjection
    public EventDetailDto(String subject, Date eventStartDate, Date eventEndDate, Integer goodsImageAttachFile, String goodsImageExtension, String goodsCode, String goodsName, String goodsBrand, String goodsGender, String goodsYear, BigDecimal supplyPrice, BigDecimal salePrice, Integer sortSequence) {
        this.subject = subject;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.goodsImageAttachFile = goodsImageAttachFile;
        this.goodsImageExtension = goodsImageExtension;
        this.goodsCode = goodsCode;
        this.goodsName = goodsName;
        this.goodsBrand = goodsBrand;
        this.goodsGender = goodsGender;
        this.goodsYear = goodsYear;
        this.supplyPrice = supplyPrice;
        this.salePrice = salePrice;
        this.sortSequence = sortSequence;
    }
}
