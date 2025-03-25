package com.mo2ver.web.domain.display.dto.response;

import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class BannerProductResponse {

    private static final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    private String displayStartDate;
    private String displayEndDate;
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

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    @QueryProjection
    public BannerProductResponse(Date displayStartDate, Date displayEndDate, Integer goodsImageAttachFile, String goodsImageExtension, String goodsCode, String goodsName, String goodsBrand, String goodsGender, String goodsYear, BigDecimal supplyPrice, BigDecimal salePrice, Integer sortSequence) {
        this.displayStartDate = formatter.format(displayStartDate);
        this.displayEndDate = formatter.format(displayEndDate);
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
    }
}
