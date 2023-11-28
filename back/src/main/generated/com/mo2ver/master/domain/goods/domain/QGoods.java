package com.mo2ver.master.domain.goods.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QGoods is a Querydsl query type for Goods
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGoods extends EntityPathBase<Goods> {

    private static final long serialVersionUID = -1596814768L;

    public static final QGoods goods = new QGoods("goods");

    public final StringPath goodsCode = createString("goodsCode");

    public final StringPath GoodsCondition = createString("GoodsCondition");

    public final StringPath goodsName = createString("goodsName");

    public final StringPath LargeCategoryCode = createString("LargeCategoryCode");

    public final StringPath MediumCategoryCode = createString("MediumCategoryCode");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final StringPath SmallCategoryCode = createString("SmallCategoryCode");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public QGoods(String variable) {
        super(Goods.class, forVariable(variable));
    }

    public QGoods(Path<? extends Goods> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGoods(PathMetadata metadata) {
        super(Goods.class, metadata);
    }

}

