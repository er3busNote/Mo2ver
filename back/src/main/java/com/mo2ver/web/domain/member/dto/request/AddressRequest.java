package com.mo2ver.web.domain.member.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AddressRequest {

    @NotNull(message = "배송지주소가 존재하지 않습니다")
    @Range(min = 0)
    private Long addressNo;
}
