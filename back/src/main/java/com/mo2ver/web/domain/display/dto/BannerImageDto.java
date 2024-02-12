package com.mo2ver.web.domain.display.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private Date startDate;

    private Date endDate;

    @NotBlank(message = "템플릿 유형이 존재하지 않습니다")
    private String position;

    @NotNull(message = "전시여부가 존재하지 않습니다")
    private Character useyn;

    private List<BannerImageDetailDto> bnnrImg;
}
