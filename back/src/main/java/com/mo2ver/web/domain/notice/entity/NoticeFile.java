package com.mo2ver.web.domain.notice.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "NTC_FILE", // 공지사항파일관리
        indexes={
                @Index(name="FK_NTC_TO_NTC_FILE", columnList="NTC_MNG_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "noticeFileNo")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class NoticeFile {

    @Id
    @Column(name = "NTC_FILE_NO", columnDefinition = "BIGINT(20) COMMENT '공지사항파일관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long noticeFileNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "NTC_MNG_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_NTC_TO_NTC_FILE"),
            columnDefinition = "BIGINT(20) COMMENT '공지사항관리번호'"
    )
    private Notice notice;

    @Column(name = "ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '첨부파일'")
    private Integer attachFile;

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

    public static NoticeFile from(Notice notice) {
        return NoticeFile.builder()
                .notice(notice)
                .register(notice.getRegister())
                .updater(notice.getUpdater())
                .build();
    }

    public static NoticeFile of(Notice notice, Integer attachFile, Character useYesNo, Member currentUser) {
        return NoticeFile.builder()
                .notice(notice)
                .attachFile(attachFile)
                .useYesNo(useYesNo)
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
