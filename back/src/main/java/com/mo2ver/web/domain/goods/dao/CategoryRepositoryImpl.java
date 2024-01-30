package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.QCategory;
import com.mo2ver.web.domain.goods.dto.CategoryDto;
import com.mo2ver.web.domain.goods.dto.QCategoryDto;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringExpressions;
import com.querydsl.jpa.sql.JPASQLQuery;
import com.querydsl.sql.MySQLTemplates;

import javax.persistence.EntityManager;
import java.util.List;

import static com.querydsl.sql.SQLExpressions.*;

public class CategoryRepositoryImpl implements CategoryRepositoryCustom {

    private final EntityManager entityManager;

    public CategoryRepositoryImpl(EntityManager entityManager)  {
        this.entityManager = entityManager;
    }

    public List<CategoryDto> findCategory() {

        QCategory TC = new QCategory("TC");
        QCategory C = new QCategory("C");   // 자식
        QCategory P = new QCategory("P");   // 부모

        JPASQLQuery<QCategoryDto> query = new JPASQLQuery<>(entityManager, MySQLTemplates.DEFAULT);
        EntityPathBase<QCategoryDto> recursive = new EntityPathBase<>(QCategoryDto.class, "TC");

        StringExpression sortOrdinal = new CaseBuilder()
                .when(TC.categoryCode.isEmpty().or(TC.categoryCode.isNull())).then("")
                .when(TC.categoryLevel.eq(1)).then(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0').concat("000000"))
                .when(TC.categoryLevel.eq(2)).then(TC.categoryCode.substring(1, 4).concat(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0')).concat("000"))
                .when(TC.categoryLevel.eq(3)).then(TC.categoryCode.substring(1, 7).concat(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0')))
                .otherwise("").as("SORT_ORD");

        return query.withRecursive(recursive, C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo)
                .as(unionAll(
                        select(C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo).from(C).where(C.upperCategoryCode.isNull()),
                        select(P.categoryCode, P.categoryName, P.upperCategoryCode, P.sortSequence, P.categoryLevel, P.useYesNo).from(P).innerJoin(recursive).on(TC.categoryCode.eq(P.upperCategoryCode))
                ))
                .select(new QCategoryDto(
                        TC.categoryCode, TC.categoryName,
                        TC.upperCategoryCode.coalesce("C000000000").as("UPPR_CAT_CD"),
                        TC.sortSequence, TC.categoryLevel,
                        sortOrdinal,
                        TC.useYesNo)
                )
                .from(recursive)
                .orderBy(sortOrdinal.asc())
                .fetch();
    }
}
