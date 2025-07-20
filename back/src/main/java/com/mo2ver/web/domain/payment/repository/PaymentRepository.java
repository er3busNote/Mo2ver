package com.mo2ver.web.domain.payment.repository;

import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, String> {

    Optional<Payment> findByOrder(Order order);
}
