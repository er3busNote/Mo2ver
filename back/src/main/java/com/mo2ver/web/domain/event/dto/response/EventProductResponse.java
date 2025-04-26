package com.mo2ver.web.domain.event.dto.response;

import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class EventProductResponse {

    private String subject;
    private Date eventStartDate;
    private Date eventEndDate;
    private String goodsImageAttachFile;
    private String goodsImageExtension;
    private String goodsCode;
    private String goodsName;
    private String goodsBrand;
    private String goodsGender;
    private String goodsYear;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private Integer sortSequence;
    private List<String> keywordList;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    @QueryProjection
    public EventProductResponse(String subject, Date eventStartDate, Date eventEndDate, Integer goodsImageAttachFile, String goodsImageExtension, String goodsCode, String goodsName, String goodsBrand, String goodsGender, String goodsYear, BigDecimal supplyPrice, BigDecimal salePrice, Integer sortSequence, String keyword) {
        this.subject = subject;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.goodsImageAttachFile = getEncryptor(goodsImageAttachFile);
        this.goodsImageExtension = goodsImageExtension;
        this.goodsCode = goodsCode;
        this.goodsName = goodsName;
        this.goodsBrand = goodsBrand;
        this.goodsGender = goodsGender;
        this.goodsYear = goodsYear;
        this.supplyPrice = supplyPrice;
        this.salePrice = salePrice;
        this.sortSequence = sortSequence;
        this.keywordList = getKeywordList(keyword);
    }

    public static List<String> getKeywordList(String keyword) {
        return Optional.ofNullable(keyword)
                .map(s -> Arrays.stream(s.split("#"))
                        .filter(token -> !token.isEmpty())
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }
}
