package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.QCategory;
import com.mo2ver.web.domain.goods.dto.response.CategoryResponse;
import com.mo2ver.web.domain.goods.dto.response.QCategoryResponse;
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

    public List<CategoryResponse> findCategoryList() {

        QCategory TC = new QCategory("TC");
        QCategory C = new QCategory("C");   // 자식
        QCategory P = new QCategory("P");   // 부모

        JPASQLQuery<QCategoryResponse> query = new JPASQLQuery<>(entityManager, MySQLTemplates.DEFAULT);
        EntityPathBase<QCategoryResponse> recursive = new EntityPathBase<>(QCategoryResponse.class, "TC");

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
                .select(new QCategoryResponse(
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
