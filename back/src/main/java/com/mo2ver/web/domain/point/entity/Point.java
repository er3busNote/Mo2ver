package com.mo2ver.web.domain.point.entity;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.point.dto.request.PointRequest;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(
        name = "PNT", // 포인트
        indexes={
                @Index(name="FK_MBR_TO_PNT", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "pointNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Point {

    @Id
    @GeneratedValue(generator = "pointNo")
    @GenericGenerator(name = "pointNo", strategy = "com.mo2ver.web.domain.point.entity.PointGenerator")
    @Column(name = "PNT_NO", columnDefinition = "CHAR(10) COMMENT '포인트번호'")
    private String pointNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_PNT"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Column(name = "PNT_GVN", columnDefinition = "INT(11) COMMENT '적립된포인트'")
    private Integer pointGiven;

    @Column(name = "EXPR_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '만료일시'")
    private Date expireDate;

    @OneToMany(mappedBy = "point", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PointUse> pointUses = new ArrayList<>();

    @Column(name = "REGR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '등록자'")
    @NotBlank
    private String register;

    @Builder.Default
    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime registerDate = LocalDateTime.now();

    @Column(name = "UPDR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '수정자'")
    @NotBlank
    private String updater;

    @Builder.Default
    @Column(name = "UPD_DT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시'")
    @UpdateTimestamp    // UPDATE 시 자동으로 값을 채워줌
    private LocalDateTime updateDate = LocalDateTime.now();

    public Point(PointRequest pointRequest, Member currentUser) {
        this.createOrUpdatePoint(pointRequest, currentUser);
        this.member = currentUser;
        this.pointGiven = pointRequest.getPointGiven();
        this.expireDate = pointRequest.getExpireDate();
        this.register = currentUser.getMemberNo();
    }

    private void createOrUpdatePoint(PointRequest pointRequest, Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }

    private void sortPointUses() {
        int index = 1;
        for (PointUse pointUse: this.pointUses) {
            pointUse.setDetailSequence(index++);
        }
    }

}
