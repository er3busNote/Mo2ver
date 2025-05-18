package com.mo2ver.web.domain.payment.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.PaymentRequest;
import com.mo2ver.web.domain.payment.dto.request.TossPaymentRequest;
import com.mo2ver.web.domain.payment.dto.response.PaymentResponse;
import com.mo2ver.web.domain.payment.entity.Payment;
import com.mo2ver.web.domain.payment.repository.PaymentRepository;
import com.mo2ver.web.global.common.http.WebHttpClient;
import com.mo2ver.web.global.common.setting.TossPaymentSetting;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final TossPaymentSetting tossPaymentSetting;

    @Autowired
    private Environment environment;

    @Transactional
    public PaymentResponse savePayment(PaymentRequest paymentRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Payment payment = new Payment(PaymentInfo.of(paymentRequest.getAmount()), member);
        this.paymentRepository.save(payment);
        String clientKey = tossPaymentSetting.getClientKey();
        return PaymentResponse.of(clientKey, payment.getOrderId(), payment.getAmount());
    }

    @Transactional
    public void confirmPayment(PaymentInfo paymentInfo, Member currentUser) {
        Payment payment = this.findPaymentByOrderId(paymentInfo.getOrderId());
        if(environment.acceptsProfiles("test")){
            payment.confirm(paymentInfo, currentUser);
        } else {
            String url = tossPaymentSetting.getUrlPath() + "/payments/confirm";
            String authHeader = "Basic " + Base64.getEncoder().encodeToString((tossPaymentSetting.getSecretKey() + ":").getBytes());
            WebHttpClient.post(url, authHeader, TossPaymentRequest.of(paymentInfo))
                    .subscribe(response -> {
                        log.info("응답: " + response);
                        payment.confirm(paymentInfo, currentUser);
                    }, error -> {
                        log.error("오류 발생: " + error.getMessage());
                    });
        }
    }

    @Transactional
    public void cancelPayment(PaymentInfo paymentInfo, Member currentUser) {
        Payment payment = this.findPaymentByOrderId(paymentInfo.getOrderId());
        payment.cancel(paymentInfo, currentUser);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Payment findPaymentByOrderId(String orderId) {
        return this.paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 결재정보 입니다."));
    }
}
