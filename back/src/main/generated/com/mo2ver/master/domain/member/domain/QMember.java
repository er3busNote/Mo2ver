package com.mo2ver.master.domain.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1432040196L;

    public static final QMember member = new QMember("member1");

    public final StringPath cellPhoneNumber = createString("cellPhoneNumber");

    public final StringPath email = createString("email");

    public final StringPath emailReceptionYesNo = createString("emailReceptionYesNo");

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> lastloginDate = createDateTime("lastloginDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> lastOrderDate = createDateTime("lastOrderDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> loginFailCount = createNumber("loginFailCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> loginFailDate = createDateTime("loginFailDate", java.time.LocalDateTime.class);

    public final StringPath loginId = createString("loginId");

    public final StringPath memberConditionCode = createString("memberConditionCode");

    public final StringPath memberGradeCode = createString("memberGradeCode");

    public final StringPath memberName = createString("memberName");

    public final StringPath memberNo = createString("memberNo");

    public final StringPath password = createString("password");

    public final DateTimePath<java.time.LocalDateTime> passwordChangeDate = createDateTime("passwordChangeDate", java.time.LocalDateTime.class);

    public final StringPath register = createString("register");

    public final DateTimePath<java.time.LocalDateTime> registerDate = createDateTime("registerDate", java.time.LocalDateTime.class);

    public final StringPath roadNameBasicAddress = createString("roadNameBasicAddress");

    public final StringPath roadNameDetailAddress = createString("roadNameDetailAddress");

    public final SetPath<MemberRole, EnumPath<MemberRole>> roles = this.<MemberRole, EnumPath<MemberRole>>createSet("roles", MemberRole.class, EnumPath.class, PathInits.DIRECT2);

    public final DateTimePath<java.util.Date> sleepDate = createDateTime("sleepDate", java.util.Date.class);

    public final StringPath sleepYesNo = createString("sleepYesNo");

    public final DateTimePath<java.util.Date> snsReceptionYesNo = createDateTime("snsReceptionYesNo", java.util.Date.class);

    public final DateTimePath<java.time.LocalDateTime> TempPasswordIssueDate = createDateTime("TempPasswordIssueDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final StringPath updater = createString("updater");

    public final DateTimePath<java.util.Date> withdrawalDate = createDateTime("withdrawalDate", java.util.Date.class);

    public final StringPath withdrawalReason = createString("withdrawalReason");

    public final StringPath withdrawalReasonCode = createString("withdrawalReasonCode");

    public final StringPath withdrawalYesNo = createString("withdrawalYesNo");

    public final StringPath zipcode = createString("zipcode");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

