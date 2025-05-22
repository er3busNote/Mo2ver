package com.mo2ver.web.domain.delivery.repository;

import com.mo2ver.web.domain.delivery.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, String> {
}
