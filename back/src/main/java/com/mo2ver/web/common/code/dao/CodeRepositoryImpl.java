package com.mo2ver.web.common.code.dao;

import com.mo2ver.web.common.code.dto.CodeDto;
import com.mo2ver.web.common.code.dto.GroupCodeDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;
import java.util.Map;

import static com.querydsl.core.group.GroupBy.*;
import static com.mo2ver.web.common.code.domain.QCode.code;
import static com.mo2ver.web.common.code.domain.QGroupCode.groupCode;

public class CodeRepositoryImpl implements CodeRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public CodeRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    public Map<String, List<CodeDto>> findGroupCodeByCodelist(List<String> groupCodelist) {
        return queryFactory
                .selectFrom(groupCode)
                .leftJoin(code).on(code.commonGroupCode.eq(groupCode))
                .where(groupCode.commonGroupCode.in(groupCodelist))
                .where(code.useYesNo.eq('Y'))
                .orderBy(groupCode.sortSequence.asc(), code.sortSequence.asc())
                .transform(groupBy(groupCode.commonGroupCode).as(
                        list(Projections.constructor(CodeDto.class,
                                code.commonCode,
                                code.commonCodeName,
                                code.description,
                                code.sortSequence
                        ))
                ));
    }

    public List<GroupCodeDto> findGroupCodeByCodelistDetail(List<String> groupCodelist) {
        return queryFactory
                .selectFrom(groupCode)
                .leftJoin(code).on(code.commonGroupCode.eq(groupCode))
                .where(groupCode.commonGroupCode.in(groupCodelist))
                .where(code.useYesNo.eq('Y'))
                .orderBy(groupCode.sortSequence.asc(), code.sortSequence.asc())
                .transform(groupBy(groupCode.commonGroupCode).list(
                        Projections.constructor(GroupCodeDto.class,
                                groupCode.commonGroupCode,
                                groupCode.commonCodeGroupName,
                                list(Projections.constructor(CodeDto.class,
                                        code.commonCode,
                                        code.commonCodeName,
                                        code.description,
                                        code.sortSequence
                                ))
                        )
                ));
    }
}
