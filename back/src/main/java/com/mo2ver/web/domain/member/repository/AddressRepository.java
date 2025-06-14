package com.mo2ver.web.domain.member.repository;

import com.mo2ver.web.domain.member.entity.Address;
import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByMember(Member member);
    Long countByMember(Member member);
}
