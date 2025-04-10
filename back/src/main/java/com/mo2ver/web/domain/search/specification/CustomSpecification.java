package com.mo2ver.web.domain.search.specification;

import com.mo2ver.web.domain.search.dto.FilterInfo;
import com.mo2ver.web.domain.search.dto.Operation;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class CustomSpecification {

    public static <T> Specification<T> bySearchQuery(List<FilterInfo> filterInfos, Class<T> clazz) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for(final FilterInfo filterInfo : filterInfos) {
                setSearchOperation(predicates, filterInfo, builder, root, null);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static <TM, TJ> Specification<TM> bySearchJoinQuery(List<FilterInfo> filterInfos, Class<TM> clazz, Class<TJ> joinClazz) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            Join<TM, TJ> join = root.join(joinClazz.getSimpleName().toLowerCase(), JoinType.LEFT);  // 클래스명(X) → 필드명(O)

            for(final FilterInfo filterInfo : filterInfos) {
                setSearchOperation(predicates, filterInfo, builder, root, join);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static <TM, TJ> void setSearchOperation(List<Predicate> predicates, FilterInfo filterInfo, CriteriaBuilder builder, Root<TM> root, Join<TM, TJ> join) {
        String column = filterInfo.getColumn();
        String value = filterInfo.getValue().toString();
        Operation operation = filterInfo.getOperation();
        boolean isJoin = filterInfo.isJoin();
        switch (operation) {
            case GT:
                predicates.add(builder.greaterThan(root.get(column), value));
                break;
            case LT:
                predicates.add(builder.lessThan(root.get(column), value));
                break;
            case GTE:
                if(isJoin) predicates.add(builder.greaterThanOrEqualTo(join.get(column), value));
                else predicates.add(builder.greaterThanOrEqualTo(root.get(column), value));
                break;
            case LTE:
                if(isJoin) predicates.add(builder.lessThanOrEqualTo(join.get(column), value));
                else predicates.add(builder.lessThanOrEqualTo(root.get(column), value));
                break;
            case NOT_EQUAL:
                predicates.add(builder.notEqual(root.get(column), value));
                break;
            case EQUAL:
                predicates.add(builder.equal(root.get(column), value));
                break;
            case LIKE:
                predicates.add(builder.like(root.get(column), value));
                break;
            case IN:
                predicates.add(builder.in(root.get(column)).value(filterInfo.getValue()));
                break;
            case NOT_IN:
                predicates.add(builder.not(root.get(column)).in(filterInfo.getValue()));
                break;
            case IS_NULL:
                predicates.add(builder.isNull(root.get(column)));
                break;
            case IS_NOT_NULL:
                predicates.add(builder.isNotNull(root.get(column)));
                break;
        }
    }
}
