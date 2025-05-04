package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.domain.display.entity.Banner;
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

    public static BannerInfo of(Banner banner) {
        return BannerInfo.builder()
                .bannerManageNo(banner.getBannerManageNo())
                .subject(banner.getSubject())
                .displayStartDate(banner.getDisplayStartDate())
                .displayEndDate(banner.getDisplayEndDate())
                .displayTemplateCode(banner.getDisplayTemplateCode())
                .displayConditionCode(banner.getDisplayConditionCode())
                .displayYesNo(banner.getDisplayYesNo())
                .register(banner.getRegister())
                .registerDate(Timestamp.valueOf(banner.getRegisterDate()))
                .build();
    }
}
