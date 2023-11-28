package com.mo2ver.master.domain.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLoginHistory is a Querydsl query type for LoginHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLoginHistory extends EntityPathBase<LoginHistory> {

    private static final long serialVersionUID = 2042529229L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLoginHistory loginHistory = new QLoginHistory("loginHistory");

    public final StringPath ipAddress = createString("ipAddress");

    public final NumberPath<Long> loginHistoryManageNo = createNumber("loginHistoryManageNo", Long.class);

    public final QMember memberNo;

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final StringPath sessionId = createString("sessionId");

    public QLoginHistory(String variable) {
        this(LoginHistory.class, forVariable(variable), INITS);
    }

    public QLoginHistory(Path<? extends LoginHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLoginHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLoginHistory(PathMetadata metadata, PathInits inits) {
        this(LoginHistory.class, metadata, inits);
    }

    public QLoginHistory(Class<? extends LoginHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberNo = inits.isInitialized("memberNo") ? new QMember(forProperty("memberNo")) : null;
    }

}

