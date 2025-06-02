package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Options;
import com.mo2ver.web.domain.goods.type.OptionsType;
import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OptionsRepository  extends JpaRepository<Options, Long> {
    Optional<Options> findByMemberAndOptionsType(Member member, OptionsType optionsType);
}
