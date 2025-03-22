package com.mo2ver.web.domain.member.repository;

import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    Member findFirstByOrderByMemberNoDesc();
    Optional<Member> findByLoginId(String loginId);
}
