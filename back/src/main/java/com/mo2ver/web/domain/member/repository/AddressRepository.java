package com.mo2ver.web.domain.member.repository;

import com.mo2ver.web.domain.member.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
