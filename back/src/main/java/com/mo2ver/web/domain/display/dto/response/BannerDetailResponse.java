package com.mo2ver.web.domain.display.dto.response;

import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class BannerDetailResponse {

    private static final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    private String displayStartDate;
    private String displayEndDate;
    private String imageAttachFile;
    private String connectUrl;
    private String bannerContents;
    private Integer sortSequence;

    @QueryProjection
    public BannerDetailResponse(Date displayStartDate, Date displayEndDate, Integer imageAttachFile, String connectUrl, String bannerContents, Integer sortSequence) {
        this.displayStartDate = formatter.format(displayStartDate);
        this.displayEndDate = formatter.format(displayEndDate);
        this.imageAttachFile = JasyptUtil.getEncryptor(imageAttachFile);
        this.connectUrl = connectUrl;
        this.bannerContents = bannerContents;
        this.sortSequence = sortSequence;
    }
}
