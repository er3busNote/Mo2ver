package com.mo2ver.web.domain.point.dto.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PointRequest {

    @NotBlank(groups = Update.class)
    private String pointNo;

    @NotNull(message="적립된포인트를 입력해 주세요.")
    private Integer pointGiven;

    @NotNull(message = "만료될시점이 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date expireDate;

    public interface Update extends Default {}
}
