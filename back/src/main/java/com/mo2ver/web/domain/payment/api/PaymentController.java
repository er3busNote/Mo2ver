package com.mo2ver.web.domain.payment.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.PaymentRequest;
import com.mo2ver.web.domain.payment.dto.response.PaymentResponse;
import com.mo2ver.web.domain.payment.service.PaymentService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<PaymentResponse> createPayment(
            @RequestBody @Valid PaymentRequest paymentRequest,
            @CurrentUser Member currentUser
    ) {
        PaymentResponse paymentResponse = paymentService.savePayment(paymentRequest, currentUser);
        return ResponseEntity.ok().body(paymentResponse);
    }

    @PostMapping("/confirm")
    public ResponseEntity<ResponseHandler> confirmPayment(
            @RequestBody @Valid PaymentInfo paymentInfo,
            @CurrentUser Member currentUser
    ) {
        paymentService.confirmPayment(paymentInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("결재정보가 승인되었습니다")
                        .build());
    }

    @PostMapping("/cancel")
    public ResponseEntity<ResponseHandler> cancelPayment(
            @RequestBody @Validated(PaymentInfo.Update.class) PaymentInfo paymentInfo,
            @CurrentUser Member currentUser
    ) {
        paymentService.cancelPayment(paymentInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("결재정보가 취소되었습니다")
                        .build());
    }
}
