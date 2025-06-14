package com.mo2ver.web.domain.member.dto.response;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberResponse {

    private static final SimpleDateFormat simpleformatter = new SimpleDateFormat("yyyy-MM-dd");
    private static final DateTimeFormatter dateformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private String loginId;
    private String memberName;
    private String passwordChangeDate;
    private String tempPasswordIssueDate;
    private Integer loginFailCount;
    private String loginFailDate;
    private String memberConditionCode;
    private String memberGradeCode;
    private String cellPhoneNumber;
    private String email;
    private Character emailReceptionYesNo;
    private Character snsReceptionYesNo;
    private String joinDate;
    private String lastOrderDate;
    private String lastloginDate;
    private Character sleepYesNo;
    private String sleepDate;
    private Character withdrawalYesNo;
    private String withdrawalDate;
    private String withdrawalReasonCode;
    private String withdrawalReason;

    public static MemberResponse of(Member member) {
        return MemberResponse.builder()
                .loginId(member.getLoginId())
                .memberName(member.getMemberName())
                .passwordChangeDate(Optional.ofNullable(member.getPasswordChangeDate()).map(dateformatter::format).orElse(""))
                .tempPasswordIssueDate(Optional.ofNullable(member.getTempPasswordIssueDate()).map(dateformatter::format).orElse(""))
                .loginFailCount(member.getLoginFailCount())
                .loginFailDate(Optional.ofNullable(member.getLoginFailDate()).map(dateformatter::format).orElse(""))
                .memberConditionCode(member.getMemberConditionCode())
                .memberGradeCode(member.getMemberGradeCode())
                .cellPhoneNumber(member.getCellPhoneNumber())
                .email(member.getEmail())
                .emailReceptionYesNo(member.getEmailReceptionYesNo())
                .snsReceptionYesNo(member.getSnsReceptionYesNo())
                .joinDate(Optional.ofNullable(member.getJoinDate()).map(dateformatter::format).orElse(""))
                .lastOrderDate(Optional.ofNullable(member.getLastOrderDate()).map(dateformatter::format).orElse(""))
                .lastloginDate(Optional.ofNullable(member.getLastloginDate()).map(dateformatter::format).orElse(""))
                .sleepYesNo(member.getSleepYesNo())
                .sleepDate(Optional.ofNullable(member.getSleepDate()).map(simpleformatter::format).orElse(""))
                .withdrawalYesNo(member.getWithdrawalYesNo())
                .withdrawalDate(Optional.ofNullable(member.getWithdrawalDate()).map(simpleformatter::format).orElse(""))
                .withdrawalReasonCode(member.getWithdrawalReasonCode())
                .withdrawalReason(member.getWithdrawalReason())
                .build();
    }
}
