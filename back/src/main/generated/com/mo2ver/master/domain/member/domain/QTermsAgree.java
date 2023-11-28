package com.mo2ver.master.domain.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTermsAgree is a Querydsl query type for TermsAgree
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTermsAgree extends EntityPathBase<TermsAgree> {

    private static final long serialVersionUID = 300701383L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTermsAgree termsAgree = new QTermsAgree("termsAgree");

    public final DateTimePath<java.util.Date> agreeDate = createDateTime("agreeDate", java.util.Date.class);

    public final StringPath agreeYesNo = createString("agreeYesNo");

    public final QMember memberNo;

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final QTermsManage termsManageNo;

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QTermsAgree(String variable) {
        this(TermsAgree.class, forVariable(variable), INITS);
    }

    public QTermsAgree(Path<? extends TermsAgree> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTermsAgree(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTermsAgree(PathMetadata metadata, PathInits inits) {
        this(TermsAgree.class, metadata, inits);
    }

    public QTermsAgree(Class<? extends TermsAgree> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberNo = inits.isInitialized("memberNo") ? new QMember(forProperty("memberNo")) : null;
        this.termsManageNo = inits.isInitialized("termsManageNo") ? new QTermsManage(forProperty("termsManageNo")) : null;
    }

}

