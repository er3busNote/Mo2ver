package com.mo2ver.web.goods;

import com.mo2ver.web.domain.goods.domain.Category;
import com.mo2ver.web.domain.goods.domain.QCategory;
import com.mo2ver.web.domain.goods.dto.CategoryDto;
import com.mo2ver.web.domain.goods.dto.QCategoryDto;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.sql.JPASQLQuery;
import com.querydsl.sql.SQLExpressions;
import com.querydsl.sql.SQLQuery;
import com.querydsl.sql.Union;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import com.querydsl.sql.MySQLTemplates;

import java.util.List;

import static com.mo2ver.web.domain.goods.domain.QCategory.*;
import static com.querydsl.sql.SQLExpressions.select;
import static com.querydsl.sql.SQLExpressions.unionAll;

@Slf4j
@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class QueryDSLTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    JPAQueryFactory queryFactory;

    @Test
    @DisplayName("QueryDSL 실행 확인")
    public void categoryProjectionTest() {

        queryFactory.select(category.categoryName)
                .from(category)
                .fetch()
                .stream()
                .forEach(name -> log.info("name id : " + name));
    }

    @Test
    @DisplayName("QueryDSL Recursive CTE 확인")
    public void findCategoryTest() {

        QCategory TC = new QCategory("TC");
        QCategory C = new QCategory("C");   // 자식
        QCategory P = new QCategory("P");   // 부모

        JPASQLQuery<?> query = new JPASQLQuery<>(entityManager, MySQLTemplates.DEFAULT);
        EntityPathBase<QCategoryDto> recursive = new EntityPathBase<>(QCategoryDto.class, "TC");

        // SELECT CAT_CD, CAT_NM, UPPR_CAT_CD, SORT_SEQ, CAT_LV, USE_YN FROM T_GD_CAT WHERE UPPR_CAT_CD IS NULL
        SQLQuery<Category> T = SQLExpressions.select(
                Projections.fields(Category.class, C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo)
        ).from(C).where(C.upperCategoryCode.isNull());

        // SELECT C.CAT_CD, C.CAT_NM, C.UPPR_CAT_CD, C.SORT_SEQ, C.CAT_LV, C.USE_YN FROM T_GD_CAT C
        // INNER JOIN TC ON C.UPPR_CAT_CD = TC.CAT_CD
        SQLQuery<Category> T1 = SQLExpressions.select(
                Projections.fields(Category.class, P.categoryCode, P.categoryName, P.upperCategoryCode, P.sortSequence, P.categoryLevel, P.useYesNo)
        ).from(P).innerJoin(recursive).on(TC.categoryCode.eq(P.upperCategoryCode));

        // UNION ALL
        Union<Category> union = SQLExpressions.unionAll(T, T1);

        StringExpression sortOrdinal = new CaseBuilder()
                .when(TC.categoryCode.isEmpty().or(TC.categoryCode.isNull())).then("")
                .when(TC.categoryLevel.eq(1)).then(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0').concat("000000"))
                .when(TC.categoryLevel.eq(2)).then(TC.categoryCode.substring(1, 4).concat(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0')).concat("000"))
                .when(TC.categoryLevel.eq(3)).then(TC.categoryCode.substring(1, 7).concat(StringExpressions.lpad(TC.sortSequence.stringValue(),3,'0')))
                .otherwise("").as("SORT_ORD");

        // SELECT TC.CAT_CD, TC.CAT_NM, IFNULL(TC.UPPR_CAT_CD, 'C000000000') AS UPPR_CAT_CD, TC.SORT_SEQ, TC.CAT_LV, TC.USE_YN FROM TC
        query.withRecursive(recursive, C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo)
                .as(union)
                .select(
                        TC.categoryCode, TC.categoryName,
                        TC.upperCategoryCode.coalesce("C000000000").as("UPPR_CAT_CD"),
                        TC.sortSequence, TC.categoryLevel,
                        sortOrdinal,
                        TC.useYesNo)
                .from(recursive)
                .orderBy(sortOrdinal.asc())
                .fetch()
                .stream()
                .forEach((row) -> log.info("row is : " + row));
    }

    @Test
    @DisplayName("QueryDSL Recursive CTE Type 확인")
    public void findCategoryTypeTest() {

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

        List<Tuple> resultQuerydsl = query.withRecursive(recursive, C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo)
                .as(unionAll(
                        select(C.categoryCode, C.categoryName, C.upperCategoryCode, C.sortSequence, C.categoryLevel, C.useYesNo).from(C).where(C.upperCategoryCode.isNull()),
                        select(P.categoryCode, P.categoryName, P.upperCategoryCode, P.sortSequence, P.categoryLevel, P.useYesNo).from(P).innerJoin(recursive).on(TC.categoryCode.eq(P.upperCategoryCode))
                ))
                .select(
                        TC.categoryCode, TC.categoryName,
                        TC.upperCategoryCode.coalesce("C000000000").as("UPPR_CAT_CD"),
                        TC.sortSequence, TC.categoryLevel,
                        sortOrdinal,
                        TC.useYesNo
                )
                .from(recursive)
                .orderBy(sortOrdinal.asc())
                .fetch();

        resultQuerydsl.stream()
                .map(tuple -> new CategoryDto(
                        tuple.get(0, String.class),
                        tuple.get(1, String.class),
                        tuple.get(2, String.class),
                        tuple.get(3, Integer.class),
                        tuple.get(4, Integer.class),
                        tuple.get(5, String.class),
                        tuple.get(6, Character.class)))
                .forEach((row) -> log.info("row is : " + row));;
    }
}
