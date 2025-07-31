package com.mo2ver.web.domain.point.repository;

import com.mo2ver.web.domain.point.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, String>, PointRepositoryCustom {
}
