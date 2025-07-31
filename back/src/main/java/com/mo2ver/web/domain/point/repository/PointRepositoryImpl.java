package com.mo2ver.web.domain.point.repository;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.point.dto.PointInfo;
import com.mo2ver.web.domain.point.dto.QPointInfo;
import com.mo2ver.web.domain.point.entity.Point;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.mo2ver.web.domain.point.entity.QPoint.point;
import static com.mo2ver.web.domain.point.entity.QPointUse.pointUse;
import static com.querydsl.core.group.GroupBy.groupBy;

public class PointRepositoryImpl  extends QuerydslRepositorySupport implements PointRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public PointRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Point.class);
        this.queryFactory = queryFactory;
    }

    public List<PointInfo> findPointDetail(Member member) {
        StringTemplate expireDate = Expressions.stringTemplate("DATE({0})", point.expireDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(Expressions.currentDate().stringValue().loe(expireDate));
        builder.and(point.member.eq(member));

        return queryFactory
                .selectFrom(point)
                .where(builder)
                .orderBy(point.pointNo.asc())
                .transform(groupBy(point.pointNo).list(
                        new QPointInfo(
                                point.pointNo,
                                point.pointGiven,
                                JPAExpressions.select(pointUse.useAmount.sum())
                                        .from(pointUse)
                                        .where(pointUse.point.eq(point))
                        )
                ));
    }
}
