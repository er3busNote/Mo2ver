package com.mo2ver.web.domain.display.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannerImageDto {

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

    @NotBlank(message = "템플릿 유형이 존재하지 않습니다")
    private String position;

    @NotNull(message = "전시상태코드가 존재하지 않습니다")
    private String code;

    @NotNull(message = "전시여부가 존재하지 않습니다")
    private Character useyn;

    private List<BannerImageDetailDto> bnnrImg;
}
