package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.domain.display.domain.BannerManage;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BannerInfo {

    @NotNull(message = "배너관리번호가 존재하지 않습니다")
    @Range(min = 1)
    private Long bannerManageNo;
    private String subject;
    private Date displayStartDate;
    private Date displayEndDate;
    @NotNull(message = "템플릿 유형이 존재하지 않습니다")
    private String displayTemplateCode;
    private String displayConditionCode;
    private Character displayYesNo;
    private String register;
    private Date registerDate;

    public static BannerInfo of(BannerManage bannerManage) {
        return BannerInfo.builder()
                .bannerManageNo(bannerManage.getBannerManageNo())
                .subject(bannerManage.getSubject())
                .displayStartDate(bannerManage.getDisplayStartDate())
                .displayEndDate(bannerManage.getDisplayEndDate())
                .displayTemplateCode(bannerManage.getDisplayTemplateCode())
                .displayConditionCode(bannerManage.getDisplayConditionCode())
                .displayYesNo(bannerManage.getDisplayYesNo())
                .register(bannerManage.getRegister())
                .registerDate(Timestamp.valueOf(bannerManage.getRegisterDate()))
                .build();
    }
}
