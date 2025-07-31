package com.mo2ver.web.domain.point.repository;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.point.dto.PointInfo;

import java.util.List;

public interface PointRepositoryCustom {
    List<PointInfo> findPointDetail(Member member);
}
