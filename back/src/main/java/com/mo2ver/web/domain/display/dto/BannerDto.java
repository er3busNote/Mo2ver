package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.domain.display.domain.BannerManage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannerDto {

    private Long bannerManageNo;
    private String subject;
    private Date displayStartDate;
    private Date displayEndDate;
    private Character displayYesNo;
    private String register;
    private Date registerDate;

    public static BannerDto toDTO(BannerManage bannerManage) {
        return BannerDto.builder()
                .bannerManageNo(bannerManage.getBannerManageNo())
                .subject(bannerManage.getSubject())
                .displayStartDate(bannerManage.getDisplayStartDate())
                .displayEndDate(bannerManage.getDisplayEndDate())
                .displayYesNo(bannerManage.getDisplayYesNo())
                .register(bannerManage.getRegister())
                .registerDate(Timestamp.valueOf(bannerManage.getRegisterDate()))
                .build();
    }
}
