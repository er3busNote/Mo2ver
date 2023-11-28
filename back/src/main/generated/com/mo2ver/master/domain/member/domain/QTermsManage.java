package com.mo2ver.master.domain.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTermsManage is a Querydsl query type for TermsManage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTermsManage extends EntityPathBase<TermsManage> {

    private static final long serialVersionUID = 1069694122L;

    public static final QTermsManage termsManage = new QTermsManage("termsManage");

    public final DateTimePath<java.util.Date> displayStartDate = createDateTime("displayStartDate", java.util.Date.class);

    public final StringPath displayYesNo = createString("displayYesNo");

    public final StringPath essentialAgreeYesNo = createString("essentialAgreeYesNo");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final StringPath termsDescription = createString("termsDescription");

    public final StringPath termsHtml = createString("termsHtml");

    public final NumberPath<Integer> termsManageNo = createNumber("termsManageNo", Integer.class);

    public final StringPath termsTypeCode = createString("termsTypeCode");

    public final StringPath termsVersion = createString("termsVersion");

    public final StringPath updateContents = createString("updateContents");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QTermsManage(String variable) {
        super(TermsManage.class, forVariable(variable));
    }

    public QTermsManage(Path<? extends TermsManage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTermsManage(PathMetadata metadata) {
        super(TermsManage.class, metadata);
    }

}

