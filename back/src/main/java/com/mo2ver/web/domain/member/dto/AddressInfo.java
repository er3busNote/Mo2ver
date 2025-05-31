package com.mo2ver.web.domain.member.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.groups.Default;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AddressInfo {

    @NotNull(groups = Update.class)
    private Long addressNo;

    @NotBlank(message = "수령인을 입력해주세요")
    @Size(min = 3, max = 50, message = "수령인은 3자 이상 50자 이하로 입력해야 합니다.")
    private String memberName;

    @NotBlank(message = "핸드폰번호를 입력해주세요")
    @Size(min = 3, max = 12, message = "핸드폰번호는 3자 이상 12자 이하로 입력해야 합니다.")
    private String cellPhoneNumber;

    @NotBlank(message = "우편번호를 입력해주세요")
    @Size(min = 3, max = 12, message = "우편번호는 3자 이상 12자 이하로 입력해야 합니다.")
    private String zipcode;

    @NotBlank(message = "도로명기본주소를 입력해주세요")
    @Size(min = 3, max = 255, message = "도로명기본주소는 3자 이상 255자 이하로 입력해야 합니다.")
    private String roadNameBasicAddress;

    @NotBlank(message = "도로명상세주소를 입력해주세요")
    @Size(min = 3, max = 255, message = "도로명상세주소는 3자 이상 255자 이하로 입력해야 합니다.")
    private String roadNameDetailAddress;

    public interface Update extends Default {}
}
