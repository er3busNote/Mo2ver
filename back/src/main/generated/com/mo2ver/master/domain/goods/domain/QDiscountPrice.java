package com.mo2ver.master.domain.goods.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiscountPrice is a Querydsl query type for DiscountPrice
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiscountPrice extends EntityPathBase<DiscountPrice> {

    private static final long serialVersionUID = -67779198L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiscountPrice discountPrice1 = new QDiscountPrice("discountPrice1");

    public final NumberPath<java.math.BigDecimal> discountPrice = createNumber("discountPrice", java.math.BigDecimal.class);

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    public final QGoods goodsCode;

    public final NumberPath<Long> goodsPriceId = createNumber("goodsPriceId", Long.class);

    public final NumberPath<java.math.BigDecimal> maxLimitAmount = createNumber("maxLimitAmount", java.math.BigDecimal.class);

    public final StringPath maxLimitYesNo = createString("maxLimitYesNo");

    public final StringPath rateYesNo = createString("rateYesNo");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QDiscountPrice(String variable) {
        this(DiscountPrice.class, forVariable(variable), INITS);
    }

    public QDiscountPrice(Path<? extends DiscountPrice> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiscountPrice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiscountPrice(PathMetadata metadata, PathInits inits) {
        this(DiscountPrice.class, metadata, inits);
    }

    public QDiscountPrice(Class<? extends DiscountPrice> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.goodsCode = inits.isInitialized("goodsCode") ? new QGoods(forProperty("goodsCode")) : null;
    }

}

