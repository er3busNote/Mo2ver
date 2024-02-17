package com.mo2ver.web.domain.event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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
public class EventImageDto {

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotNull(message = "이벤트시작일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date eventStartDate;

    @NotNull(message = "이벤트종료일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date eventEndDate;

    @NotNull(message = "이벤트진행여부가 존재하지 않습니다")
    private Character eventYesNo;

    private List<EventImageProductDto> goods;
}
