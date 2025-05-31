package com.mo2ver.web.domain.member.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SignupRequest {

    @NotBlank(message = "아이디를 입력해주세요")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하로 입력해야 합니다.")
    private String username;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Size(min = 8, max = 50, message = "비밀번호는 3자 이상 8자 이하로 입력해야 합니다.")
    private String password;

    @NotBlank(message = "이메일을 입력해주세요")
    @Size(min = 5, max = 50, message = "비밀번호는 5자 이상 8자 이하로 입력해야 합니다.")
    private String email;
}
