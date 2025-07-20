package com.mo2ver.web.domain.order.repository;

import com.mo2ver.web.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}
