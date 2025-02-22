package com.mo2ver.web.domain.event.dto.request;

import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventImageRequest {

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotNull(message = "이벤트시작일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotNull(message = "이벤트종료일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @NotNull(message = "이벤트진행여부가 존재하지 않습니다")
    private Character useyn;

    private List<EventImageProductInfo> goods;
}
