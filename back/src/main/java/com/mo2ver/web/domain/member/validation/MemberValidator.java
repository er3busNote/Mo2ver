package com.mo2ver.web.domain.member.validation;

import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class MemberValidator {

    private final static Pattern PATTERN_UPPER_CASE = Pattern.compile("[A-Z]");     // 영어 대문자 정규식 패턴
    private final static Pattern PATTERN_LOWER_CASE = Pattern.compile("[a-z]");     // 영어 소문자 정규식 패턴
    private final static Pattern PATTERN_DIGIT = Pattern.compile("[\\d]");          // 숫자 정규식 패턴
    private final static Pattern PATTERN_SPECIAL_CHAR = Pattern.compile("[\\p{Punct}]");    // 특수문자 정규식 패턴

    private static boolean hasUpperCase(String password) {
        Matcher matcher = PATTERN_UPPER_CASE.matcher(password);
        return matcher.find();
    }

    private static boolean hasLowerCase(String password) {
        Matcher matcher = PATTERN_LOWER_CASE.matcher(password);
        return matcher.find();
    }

    private static boolean hasDigit(String password) {
        Matcher matcher = PATTERN_DIGIT.matcher(password);
        return matcher.find();
    }

    private static boolean hasSpecialChar(String password) {
        Matcher matcher = PATTERN_SPECIAL_CHAR.matcher(password);
        return matcher.find();
    }

    public void validate(SignupRequest signupRequest, Errors errors) {
        if (!hasUpperCase(signupRequest.getPassword())) {
            errors.rejectValue("password", "wrongValue", "비밀번호는 대문자를 포함하지 않습니다");
        }

        if (!hasLowerCase(signupRequest.getPassword())) {
            errors.rejectValue("password", "wrongValue", "비밀번호는 소문자를 포함하지 않습니다");
        }

        if (!hasDigit(signupRequest.getPassword())) {
            errors.rejectValue("password", "wrongValue", "비밀번호는 숫자를 포함하지 않습니다");
        }

        if (!hasSpecialChar(signupRequest.getPassword())) {
            errors.rejectValue("password", "wrongValue", "암호에 특수 문자가 포함되어 있지 않습니다");
        }

        // TODO BeginEventDateTime
        // TODO CloseEnrollmentDateTime
    }
}
