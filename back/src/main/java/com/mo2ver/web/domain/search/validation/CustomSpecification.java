package com.mo2ver.web.domain.search.validation;

import com.mo2ver.web.domain.search.dto.FilterInfo;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class CustomSpecification {

    public static <T> Specification<T> bySearchQuery(List<FilterInfo> filterInfos, Class<T> clazz) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for(final FilterInfo filterInfo : filterInfos) {
                switch (filterInfo.getOperation()) {
                    case GT:
                        predicates.add(builder.greaterThan(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LT:
                        predicates.add(builder.lessThan(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case GTE:
                        predicates.add(builder.greaterThanOrEqualTo(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LTE:
                        predicates.add(builder.lessThanOrEqualTo(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case NOT_EQUAL:
                        predicates.add(builder.notEqual(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case EQUAL:
                        predicates.add(builder.equal(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LIKE:
                        predicates.add(builder.like(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case IN:
                        predicates.add(builder.in(root.get(filterInfo.getColumn())).value(filterInfo.getValue()));
                        break;
                    case NOT_IN:
                        predicates.add(builder.not(root.get(filterInfo.getColumn())).in(filterInfo.getValue()));
                        break;
                    case IS_NULL:
                        predicates.add(builder.isNull(root.get(filterInfo.getColumn())));
                        break;
                    case IS_NOT_NULL:
                        predicates.add(builder.isNotNull(root.get(filterInfo.getColumn())));
                        break;
                }
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static <TM, TJ> Specification<TM> bySearchJoinQuery(List<FilterInfo> filterInfos, Class<TM> clazz, Class<TJ> joinClazz) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            Join<TM, TJ> join = root.join(joinClazz.getSimpleName().toLowerCase(), JoinType.LEFT);  // 클래스명(X) → 필드명(O)

            for(final FilterInfo filterInfo : filterInfos) {
                switch (filterInfo.getOperation()) {
                    case GT:
                        predicates.add(builder.greaterThan(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LT:
                        predicates.add(builder.lessThan(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case GTE:
                        if(filterInfo.isJoin()) predicates.add(builder.greaterThanOrEqualTo(join.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        else predicates.add(builder.greaterThanOrEqualTo(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LTE:
                        if(filterInfo.isJoin()) predicates.add(builder.lessThanOrEqualTo(join.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        else predicates.add(builder.lessThanOrEqualTo(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case NOT_EQUAL:
                        predicates.add(builder.notEqual(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case EQUAL:
                        predicates.add(builder.equal(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case LIKE:
                        predicates.add(builder.like(root.get(filterInfo.getColumn()), filterInfo.getValue().toString()));
                        break;
                    case IN:
                        predicates.add(builder.in(root.get(filterInfo.getColumn())).value(filterInfo.getValue()));
                        break;
                    case NOT_IN:
                        predicates.add(builder.not(root.get(filterInfo.getColumn())).in(filterInfo.getValue()));
                        break;
                    case IS_NULL:
                        predicates.add(builder.isNull(root.get(filterInfo.getColumn())));
                        break;
                    case IS_NOT_NULL:
                        predicates.add(builder.isNotNull(root.get(filterInfo.getColumn())));
                        break;
                }
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
