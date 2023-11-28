package com.mo2ver.master.domain.goods.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPrice is a Querydsl query type for Price
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPrice extends EntityPathBase<Price> {

    private static final long serialVersionUID = -1588419517L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPrice price = new QPrice("price");

    public final DateTimePath<java.time.LocalDateTime> applyDate = createDateTime("applyDate", java.time.LocalDateTime.class);

    public final QGoods goodsCode;

    public final NumberPath<java.math.BigDecimal> goodsPrice = createNumber("goodsPrice", java.math.BigDecimal.class);

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QPrice(String variable) {
        this(Price.class, forVariable(variable), INITS);
    }

    public QPrice(Path<? extends Price> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPrice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPrice(PathMetadata metadata, PathInits inits) {
        this(Price.class, metadata, inits);
    }

    public QPrice(Class<? extends Price> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.goodsCode = inits.isInitialized("goodsCode") ? new QGoods(forProperty("goodsCode")) : null;
    }

}

