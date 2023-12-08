package com.mo2ver.master.domain.display.dto;

import com.mo2ver.master.domain.display.domain.Manage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    public static BannerDto toDTO(Manage manage) {
        return BannerDto.builder()
                .bannerManageNo(manage.getBannerManageNo())
                .subject(manage.getSubject())
                .displayStartDate(manage.getDisplayStartDate())
                .displayEndDate(manage.getDisplayEndDate())
                .displayYesNo(manage.getDisplayYesNo())
                .register(manage.getRegister())
                .registerDate(Timestamp.valueOf(manage.getRegisterDate()))
                .build();
    }
}
