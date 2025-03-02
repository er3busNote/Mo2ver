package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.global.common.util.ObjectUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BannerImageInfo {

    @NotNull(groups = Update.class)
    private Long bannerNo;

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotNull(message = "전시시작일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotNull(message = "전시종료일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    //@NotBlank(message = "노출위치가 존재하지 않습니다")
    private String position;

    @NotNull(message = "템플릿 유형이 존재하지 않습니다")
    private String type;

    @NotNull(message = "전시상태코드가 존재하지 않습니다")
    private String code;

    @NotNull(message = "전시여부가 존재하지 않습니다")
    private Character useyn;

    private List<BannerImageDetailInfo> bnnrImg;

    public interface Update extends Default {}

    @QueryProjection
    public BannerImageInfo(Long bannerNo, String title, Date startDate, Date endDate, String position, String type, String code, Character useyn, List<BannerImageDetailInfo> bnnrImg) {
        this.bannerNo = bannerNo;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.position = position;
        this.type = type;
        this.code = code;
        this.useyn = useyn;
        this.bnnrImg = bnnrImg.stream().filter(ObjectUtil::nonAllFieldsNull).collect(Collectors.toList());
    }
}
