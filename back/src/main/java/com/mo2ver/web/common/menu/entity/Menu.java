package com.mo2ver.web.common.menu.entity;

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
@Table(name = "CMM_MENU")     // 메뉴
@Getter @Setter
@EqualsAndHashCode(of = "menuCode")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Menu {

    @Id
    @Column(name = "MENU_CD", columnDefinition = "CHAR(5) COMMENT '메뉴코드'")
    private String menuCode;

    @Column(name = "MENU_NM", columnDefinition = "VARCHAR(100) COMMENT '메뉴명'")
    private String menuName;

    @Column(name = "UPPR_MENU_CD", columnDefinition = "CHAR(5) COMMENT '상위메뉴코드'")
    private String upperMenuCode;

    @Column(name= "MENU_LV", columnDefinition = "INT(11) COMMENT '메뉴레벨'")
    private Integer menuLevel;

    @Column(name = "MENU_PATH", columnDefinition = "VARCHAR(100) COMMENT '메뉴연결URL'")
    private String menuPath;

    @Column(name = "MENU_TYPE", columnDefinition = "CHAR(10) COMMENT '메뉴유형'")
    private String menuType;

    @Column(name = "DSC", columnDefinition = "VARCHAR(100) COMMENT '설명'")
    private String description;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

    @Column(name = "USE_YN", columnDefinition = "CHAR(1) COMMENT '사용여부'")
    private Character useYesNo;

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
