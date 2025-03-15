package com.mo2ver.web.domain.member.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LoginRequest {

    @NotNull(message = "아이디를 입력해주세요")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하로 입력해야 함니다.")
    private String username;

    @NotNull(message = "비밀번호를 입력해주세요")
    @Size(min = 8, max = 50, message = "비밀번호는 3자 이상 8자 이하로 입력해야 함니다.")
    private String password;
}
