package com.mo2ver.master.domain.goods.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "GD")
@Getter @Setter
@EqualsAndHashCode(of = "goodsCode")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Goods {

    @Id
    @Column(name = "GD_CD", columnDefinition = "CHAR(10) COMMENT '상품코드'")
    private String goodsCode;

    @Column(name = "GD_NM", columnDefinition = "VARCHAR(100) COMMENT '상품명'")
    private String goodsName;

    @Column(name = "L_CAT_CD", columnDefinition = "CHAR(10) COMMENT '대카테고리코드'")
    private String largeCategoryCode;

    @Column(name = "M_CAT_CD", columnDefinition = "CHAR(10) COMMENT '중카테고리코드'")
    private String mediumCategoryCode;

    @Column(name = "S_CAT_CD", columnDefinition = "CHAR(10) COMMENT '소카테고리코드'")
    private String smallCategoryCode;

    @Column(name = "GD_CND", columnDefinition = "CHAR(10) COMMENT '상품상태'")
    private String goodsCondition;

    @Column(name = "GD_GENDER", columnDefinition = "VARCHAR(12) COMMENT '성별'")
    private String goodsGender;

    @Column(name = "GD_BRAND", columnDefinition = "VARCHAR(100) COMMENT '브랜드'")
    private String goodsBrand;

    @Column(name = "GD_YEAR", columnDefinition = "VARCHAR(5) COMMENT '제조일자'")
    private String goodsYear;

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
}
