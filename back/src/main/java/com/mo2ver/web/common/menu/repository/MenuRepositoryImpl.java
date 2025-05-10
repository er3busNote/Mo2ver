package com.mo2ver.web.common.menu.repository;

import com.mo2ver.web.common.menu.dto.response.GroupMenuResponse;
import com.mo2ver.web.common.menu.dto.response.MenuResponse;
import com.mo2ver.web.common.menu.dto.response.QGroupMenuResponse;
import com.mo2ver.web.common.menu.entity.QMenu;
import com.mo2ver.web.common.menu.type.MenuType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class MenuRepositoryImpl implements MenuRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MenuRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<GroupMenuResponse> findGroupMenuByMenulistDetail(MenuType menuType) {
        QMenu menu = new QMenu("menu");
        QMenu submenu = new QMenu("submenu");

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(menu.useYesNo.eq('Y'));
        builder.and(menu.menuLevel.eq(1));

        switch (menuType) {
            case USER:
                builder.and(menu.menuType.eq("USER"));
                break;
            case ADMIN:
                builder.and(menu.menuType.eq("ADMIN"));
                break;
            default:
                break;
        }

        return queryFactory
                .selectFrom(menu)
                .leftJoin(submenu).on(menu.menuCode.eq(submenu.upperMenuCode).and(submenu.useYesNo.eq('Y')))
                .where(builder)
                .orderBy(menu.sortSequence.asc())
                .transform(groupBy(menu.menuCode).list(
                        new QGroupMenuResponse(
                                menu.menuCode,
                                menu.menuName,
                                menu.menuPath,
                                menu.description,
                                list(Projections.constructor(MenuResponse.class,
                                        submenu.menuCode,
                                        submenu.menuName,
                                        submenu.menuPath,
                                        submenu.description
                                ))
                        )
                ));
    }
}
