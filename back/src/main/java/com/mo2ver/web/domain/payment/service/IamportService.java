package com.mo2ver.web.domain.payment.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.http.IamportRequest;
import com.mo2ver.web.domain.payment.dto.response.http.IamportResponse;
import com.mo2ver.web.domain.payment.entity.Payment;
import com.mo2ver.web.domain.payment.repository.PaymentRepository;
import com.mo2ver.web.global.common.http.WebHttpClient;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.Arrays;

@Slf4j
@Service
@RequiredArgsConstructor
public class IamportService {

    private static final String URL_PATH = "https://api.iamport.kr";
    private static final String API_KEY = "REST_API_KEY";
    private static final String API_SECRET = "REST_API_SECRET";

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final Environment environment;

    @Transactional
    public Mono<Void> confirmPayment(PaymentInfo paymentInfo, Member currentUser) {
        Order order = this.findOrderById(paymentInfo.getOrderId());
        Payment payment = this.findPaymentByOrderId(order);
        if(Arrays.asList(environment.getActiveProfiles()).contains("test")){
            return Mono.fromRunnable(() -> payment.confirm(paymentInfo, currentUser));
        } else {
            return getAccessToken()
                    .flatMap(token -> getPaymentInfo(token, paymentInfo.getPaymentKey()))
                    .flatMap(paymentData -> {
                        log.info("결제 상태: {}", paymentData);
                        payment.confirm(paymentInfo, currentUser);
                        return Mono.empty();
                    });
        }
    }

    private Mono<String> getAccessToken() {
        return WebHttpClient.post(URL_PATH + "/users/getToken", IamportRequest.of(API_KEY, API_SECRET), IamportResponse.class)
                .flatMap(response -> Mono.just(response.getResponse().getAccess_token()));
    }

    private Mono<IamportResponse> getPaymentInfo(String accessToken, String impUid) {
        return WebHttpClient.get(URL_PATH + "/payments/" + impUid, accessToken, IamportResponse.class);
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
