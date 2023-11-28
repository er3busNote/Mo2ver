package com.mo2ver.master.domain.display.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QManage is a Querydsl query type for Manage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QManage extends EntityPathBase<Manage> {

    private static final long serialVersionUID = -80488169L;

    public static final QManage manage = new QManage("manage");

    public final NumberPath<Long> bannerManageNo = createNumber("bannerManageNo", Long.class);

    public final DateTimePath<java.util.Date> displayEndDate = createDateTime("displayEndDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> displayStartDate = createDateTime("displayStartDate", java.util.Date.class);

    public final StringPath displayYesNo = createString("displayYesNo");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final StringPath subject = createString("subject");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QManage(String variable) {
        super(Manage.class, forVariable(variable));
    }

    public QManage(Path<? extends Manage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QManage(PathMetadata metadata) {
        super(Manage.class, metadata);
    }

}

