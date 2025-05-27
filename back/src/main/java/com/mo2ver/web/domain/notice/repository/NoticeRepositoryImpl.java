package com.mo2ver.web.domain.notice.repository;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.QNoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
import com.mo2ver.web.domain.notice.dto.response.NoticeResponse;
import com.mo2ver.web.domain.notice.dto.response.QNoticeResponse;
import com.mo2ver.web.domain.notice.entity.Notice;
import com.mo2ver.web.global.common.auth.AuthManager;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.*;
import java.util.stream.Collectors;

import static com.mo2ver.web.domain.notice.entity.QNotice.notice;
import static com.mo2ver.web.domain.notice.entity.QNoticeFile.noticeFile;
import static com.mo2ver.web.common.file.entity.QFile.file;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class NoticeRepositoryImpl extends QuerydslRepositorySupport implements NoticeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public NoticeRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Notice.class);
        this.queryFactory = queryFactory;
    }

    public Optional<NoticeResponse> findNoticeById(Integer id) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(notice.noticeManageNo.eq(id.longValue()));

        NoticeResponse result = queryFactory.selectFrom(notice)
                .leftJoin(notice.noticeFiles, noticeFile)
                .leftJoin(file).on(noticeFile.attachFile.eq(file.fileCode.intValue()))
                .where(builder)
                .transform(groupBy(notice.noticeManageNo).list(
                        new QNoticeResponse(
                                notice.noticeManageNo,
                                notice.subject,
                                notice.noticeContents,
                                notice.noticeYesNo,
                                notice.member.memberName,
                                notice.registerDate,
                                list(Projections.constructor(FileInfo.class,
                                        file.fileCode,
                                        file.fileName,
                                        file.filePath,
                                        file.fileType,
                                        file.fileSize
                                ))
                        )
                )).stream().findFirst().orElse(null);
        return Optional.ofNullable(result);
    }

    public Page<NoticeResponse> findByAll(Pageable pageable, Member currentUser) {
        BooleanBuilder builder = new BooleanBuilder();
        if(currentUser == null || AuthManager.isUser(currentUser.getRoles())) {
            builder.and(notice.noticeYesNo.eq('Y'));
        }

        List<Long> pagedIds = Objects.requireNonNull(getQuerydsl()).applyPagination(pageable,
                queryFactory.select(notice.noticeManageNo)
                        .from(notice)
                        .where(builder)
                        .orderBy(notice.noticeManageNo.desc())
        ).fetch();

        if (pagedIds.isEmpty()) {
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        Map<Long, NoticeResponse> noticeMap = queryFactory.selectFrom(notice)
                .leftJoin(notice.noticeFiles, noticeFile)
                .leftJoin(file).on(noticeFile.attachFile.eq(file.fileCode.intValue()))
                .where(notice.noticeManageNo.in(pagedIds))
                .transform(groupBy(notice.noticeManageNo).as(
                        new QNoticeResponse(
                                notice.noticeManageNo,
                                notice.subject,
                                notice.noticeContents,
                                notice.noticeYesNo,
                                notice.member.memberName,
                                notice.registerDate,
                                list(Projections.constructor(FileInfo.class,
                                        file.fileCode,
                                        file.fileName,
                                        file.filePath,
                                        file.fileType,
                                        file.fileSize
                                ))
                        )
                ));

        List<NoticeResponse> content = pagedIds.stream()
                .map(noticeMap::get)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        long total = Optional.ofNullable(queryFactory.select(notice.count())
                    .from(notice)
                    .where(builder)
                    .fetchOne()
        ).orElse(0L);

        return new PageImpl<>(content, pageable, total);
    }

    public NoticeFileInfo findNoticeDetail(NoticeRequest noticeRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(notice.noticeManageNo.eq(noticeRequest.getNoticeManageNo()));

        return queryFactory.selectFrom(notice)
                .leftJoin(notice.noticeFiles, noticeFile)
                .leftJoin(file).on(noticeFile.attachFile.eq(file.fileCode.intValue()))
                .where(builder)
                .transform(groupBy(notice.noticeManageNo).list(
                        new QNoticeFileInfo(
                                notice.noticeManageNo,
                                notice.subject,
                                notice.noticeContents,
                                list(Projections.constructor(FileInfo.class,
                                        file.fileCode,
                                        file.fileName,
                                        file.filePath,
                                        file.fileType,
                                        file.fileSize
                                ))
                        )
                )).stream().findFirst().orElse(null);
    }
}
