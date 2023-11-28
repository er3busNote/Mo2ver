package com.mo2ver.master.domain.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QGroupCode is a Querydsl query type for GroupCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupCode extends EntityPathBase<GroupCode> {

    private static final long serialVersionUID = 1470024554L;

    public static final QGroupCode groupCode = new QGroupCode("groupCode");

    public final StringPath commonCodeGroupName = createString("commonCodeGroupName");

    public final StringPath commonGroupCode = createString("commonGroupCode");

    public final StringPath description = createString("description");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> sortSequence = createNumber("sortSequence", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public final StringPath useYesNo = createString("useYesNo");

    public QGroupCode(String variable) {
        super(GroupCode.class, forVariable(variable));
    }

    public QGroupCode(Path<? extends GroupCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGroupCode(PathMetadata metadata) {
        super(GroupCode.class, metadata);
    }

}

