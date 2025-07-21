package com.mo2ver.web.domain.point.service;

import com.mo2ver.web.domain.point.entity.Point;
import com.mo2ver.web.domain.point.repository.PointRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    private Point findPointById(Long pointManageNo) {
        return this.pointRepository.findById(pointManageNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 포인트정보 입니다."));
    }
}
