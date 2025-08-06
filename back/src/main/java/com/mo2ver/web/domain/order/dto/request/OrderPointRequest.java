package com.mo2ver.web.domain.order.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.groups.Default;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderPointRequest {

    @NotBlank(groups = Update.class)
    private String orderId;

    private Integer pointAmount;

    public interface Update extends Default {}
}
