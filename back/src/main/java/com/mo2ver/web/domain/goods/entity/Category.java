package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.dto.request.CategoryDetailRequest;
import com.mo2ver.web.domain.member.entity.Member;
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
@Table(name = "GD_CAT")    // 상품카테고리
@Getter @Setter
@EqualsAndHashCode(of = "categoryCode")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Category {

    @Id
    @Column(name = "CAT_CD", columnDefinition = "CHAR(10) COMMENT '카테고리코드'")
    private String categoryCode;

    @Column(name = "CAT_NM", columnDefinition = "VARCHAR(50) COMMENT '카테고리명'")
    private String categoryName;

    @Column(name = "UPPR_CAT_CD", columnDefinition = "CHAR(10) COMMENT '상위카테고리코드'")
    private String upperCategoryCode;

    @Column(name= "CAT_LV", columnDefinition = "INT(11) COMMENT '카테고리레벨'")
    private Integer categoryLevel;

    @Column(name = "USE_YN", columnDefinition = "CHAR(1) COMMENT '사용여부'")
    private Character useYesNo;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

    @Column(name = "CNNT_URL", columnDefinition = "VARCHAR(255) COMMENT '연결URL'")
    private String connectUrl;

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

    public static Category of(CategoryDetailRequest categoryDetailRequest, Member currentUser) {
        return Category.builder()
                .categoryCode(categoryDetailRequest.getCategoryCode())
                .categoryName(categoryDetailRequest.getCategoryName())
                .upperCategoryCode(categoryDetailRequest.getUpperCategoryCode())
                .categoryLevel(categoryDetailRequest.getCategoryLevel())
                .useYesNo(categoryDetailRequest.getUseYesNo())
                .sortSequence(categoryDetailRequest.getSortSequence())
                .connectUrl(categoryDetailRequest.getConnectUrl())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
