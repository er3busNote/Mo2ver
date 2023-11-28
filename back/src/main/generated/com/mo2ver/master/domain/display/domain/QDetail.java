package com.mo2ver.master.domain.display.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QDetail is a Querydsl query type for Detail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDetail extends EntityPathBase<Detail> {

    private static final long serialVersionUID = -334277629L;

    public static final QDetail detail = new QDetail("detail");

    public final StringPath bannerContents = createString("bannerContents");

    public final NumberPath<Long> bannerManageNo = createNumber("bannerManageNo", Long.class);

    public final StringPath connectUrl = createString("connectUrl");

    public final NumberPath<Integer> detailSequence = createNumber("detailSequence", Integer.class);

    public final StringPath imageAttachFile = createString("imageAttachFile");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> sortSequence = createNumber("sortSequence", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QDetail(String variable) {
        super(Detail.class, forVariable(variable));
    }

    public QDetail(Path<? extends Detail> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDetail(PathMetadata metadata) {
        super(Detail.class, metadata);
    }

}

