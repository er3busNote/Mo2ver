package com.mo2ver.web.domain.payment.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.http.TossPaymentRequest;
import com.mo2ver.web.domain.payment.dto.response.PaymentResponse;
import com.mo2ver.web.domain.payment.entity.Payment;
import com.mo2ver.web.domain.payment.repository.PaymentRepository;
import com.mo2ver.web.domain.payment.type.PaymentStatus;
import com.mo2ver.web.global.common.http.WebHttpClient;
import com.mo2ver.web.global.common.profile.ProfileHelper;
import com.mo2ver.web.global.common.setting.TossPaymentSetting;
import com.mo2ver.web.global.error.exception.NotFoundException;
import com.mo2ver.web.global.error.exception.TossPaymentException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class TossPaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final TossPaymentSetting tossPaymentSetting;

    @Transactional
    public PaymentResponse savePayment(String orderId, Member currentUser) {
        Order order = this.findOrderById(orderId);
        Payment payment = paymentRepository.findByOrder(order)
                .orElseGet(() -> {
                    Payment newPayment = new Payment(PaymentInfo.of(order), order, currentUser);
                    return this.paymentRepository.save(newPayment);
                });
        String clientKey = tossPaymentSetting.getClientKey();
        return PaymentResponse.of(clientKey, payment.getOrder().getOrderId());
    }

    @Transactional
    public Mono<Void> confirmPayment(PaymentInfo paymentInfo, Member currentUser) {
        Order order = this.findOrderById(paymentInfo.getOrderId());
        Payment payment = this.findPaymentByOrderId(order);
        if(ProfileHelper.isTest()){
            return Mono.fromRunnable(() -> payment.confirm(paymentInfo, currentUser));
        } else {
            String url = tossPaymentSetting.getUrlPath() + "/payments/confirm";
            String authHeader = "Basic " + Base64.getEncoder().encodeToString((tossPaymentSetting.getSecretKey() + ":").getBytes());
            return WebHttpClient.post(url, authHeader, TossPaymentRequest.of(paymentInfo))
                    .doOnSuccess(response -> {
                        log.info("결제 성공: {}", response);
                        payment.confirm(paymentInfo, currentUser);
                    })
                    .onErrorResume(WebClientResponseException.class, ex ->
                            Mono.error(new TossPaymentException("토스 오류: " + ex.getStatusText(),
                                    ex.getRawStatusCode(),
                                    ex.getResponseBodyAsString())))
                    .then();
        }
    }

    @Transactional
    public void cancelPayment(PaymentInfo paymentInfo, Member currentUser) {
        Order order = this.findOrderById(paymentInfo.getOrderId());
        Payment payment = this.findPaymentByOrderId(order);
        payment.cancel(paymentInfo, currentUser);
    }

    @Transactional
    public void exitPayment(String orderId) {
        Order order = this.findOrderById(orderId);
        Payment payment = this.findPaymentByOrderId(order);
        if (PaymentStatus.READY.equals(payment.getPaymentStatus())) {
            payment.exit();
        }
    }
    
    private Order findOrderById(String orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }

    private Payment findPaymentByOrderId(Order order) {
        return this.paymentRepository.findByOrder(order)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 결재정보 입니다."));
    }
}
