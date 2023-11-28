package com.mo2ver.master.domain.goods.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCategory is a Querydsl query type for Category
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCategory extends EntityPathBase<Category> {

    private static final long serialVersionUID = -1723584572L;

    public static final QCategory category = new QCategory("category");

    public final NumberPath<Integer> categoryLevel = createNumber("categoryLevel", Integer.class);

    public final StringPath categoryName = createString("categoryName");

    public final StringPath connectUrl = createString("connectUrl");

    public final StringPath goodsCategory = createString("goodsCategory");

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> sortSequence = createNumber("sortSequence", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public final StringPath upperCategoryCode = createString("upperCategoryCode");

    public final StringPath useYesNo = createString("useYesNo");

    public QCategory(String variable) {
        super(Category.class, forVariable(variable));
    }

    public QCategory(Path<? extends Category> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCategory(PathMetadata metadata) {
        super(Category.class, metadata);
    }

}

