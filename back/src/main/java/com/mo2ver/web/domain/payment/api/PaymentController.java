package com.mo2ver.web.domain.payment.api;

import com.mo2ver.web.domain.delivery.service.DeliveryService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.PaymentRequest;
import com.mo2ver.web.domain.payment.dto.response.PaymentResponse;
import com.mo2ver.web.domain.payment.service.TossPaymentService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.exception.TossPaymentException;
import com.mo2ver.web.global.error.type.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/payment")
public class PaymentController {

    private final TossPaymentService tossPaymentService;
    private final DeliveryService deliveryService;
    private final ErrorHandler errorHandler;

    @PostMapping("/create")
    public ResponseEntity<PaymentResponse> createPayment(
            @RequestBody @Valid PaymentRequest paymentRequest,
            @CurrentUser Member currentUser
    ) {
        PaymentResponse paymentResponse = tossPaymentService.savePayment(paymentRequest, currentUser);
        return ResponseEntity.ok().body(paymentResponse);
    }

    @PostMapping("/confirm")
    public Mono<ResponseEntity<ResponseHandler>> confirmPayment(
            @RequestBody @Valid PaymentInfo paymentInfo,
            @CurrentUser Member currentUser
    ) {
        return tossPaymentService.confirmPayment(paymentInfo, currentUser)
                .then(deliveryService.saveDelivery(paymentInfo, currentUser))
                .thenReturn(ResponseEntity.ok().body(ResponseHandler.builder()
                                .status(HttpStatus.OK.value())
                                .message("결재정보가 승인되었습니다")
                                .build()))
                .onErrorResume(TossPaymentException.class, e ->
                        Mono.just(badRequest(errorHandler.buildError(ErrorCode.TOSS_PAYMENT_ERROR, ErrorInfo.builder()
                                .errors(e.getStackTrace())
                                .message(e.getMessage())
                                .build()))))
                .onErrorResume(e ->
                        Mono.just(unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                                .message(e.getMessage())
                                .build())))
                );
    }

    @PostMapping("/cancel")
    public ResponseEntity<ResponseHandler> cancelPayment(
            @RequestBody @Validated(PaymentInfo.Update.class) PaymentInfo paymentInfo,
            @CurrentUser Member currentUser
    ) {
        tossPaymentService.cancelPayment(paymentInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("결재정보가 취소되었습니다")
                        .build());
    }

    private ResponseEntity<ResponseHandler> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(ResponseHandler.error(response));
    }

    private ResponseEntity<ResponseHandler> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(ResponseHandler.error(response));
    }
}
