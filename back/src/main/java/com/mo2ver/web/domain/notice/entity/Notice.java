package com.mo2ver.web.domain.notice.entity;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(
        name = "NTC",   // 공지사항관리
        indexes={
                @Index(name="FK_MBR_TO_NTC", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "noticeNo")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Notice {

    @Id
    @GeneratedValue(generator = "noticeNo")
    @GenericGenerator(name = "noticeNo", strategy = "com.mo2ver.web.domain.notice.entity.NoticeGenerator")
    @Column(name = "NTC_NO", columnDefinition = "CHAR(10) COMMENT '공지사항번호'")
    private String noticeNo;

    @Column(name = "SUBJ", columnDefinition = "VARCHAR(255) COMMENT '제목'")
    private String subject;

    @Column(name = "NTC_CONTS", columnDefinition = "TEXT COMMENT '공지사항내용'")
    private String noticeContents;

    @Column(name = "NTC_YN", columnDefinition = "CHAR(1) COMMENT '공지여부'")
    private Character noticeYesNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_NTC"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @OneToMany(mappedBy = "notice", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoticeFile> noticeFiles = new ArrayList<>();

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

    public Notice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        this.createOrUpdateNotice(noticeFileInfo, currentUser);
        this.member = currentUser;
        this.register = currentUser.getMemberNo();

        this.noticeFiles.addAll(this.createNoticeFiles(noticeFileInfo.getNoticeFiles(), currentUser));

        this.sortNoticeFiles();
    }

    public void update(NoticeFileInfo noticeFileInfo, Member currentUser) {
        this.createOrUpdateNotice(noticeFileInfo, currentUser);

        int oldFileSize = this.noticeFiles.size();
        this.noticeFiles.addAll(this.updateNoticeFiles(noticeFileInfo.getNoticeFiles()));
        this.noticeFiles.subList(0, oldFileSize).clear();

        this.sortNoticeFiles();
    }

    private void createOrUpdateNotice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        this.subject = noticeFileInfo.getTitle();
        this.noticeContents = noticeFileInfo.getContents();
        this.noticeYesNo = 'Y';
        this.updater = currentUser.getMemberNo();
    }

    private List<NoticeFile> createNoticeFiles(List<FileAttachInfo> files, Member currentUser) {
        return files.stream()
                .map(info -> NoticeFile.of(this, JasyptUtil.getDecryptor(info.getFileAttachCode()), 'Y', currentUser))
                .collect(Collectors.toList());
    }

    private List<NoticeFile> updateNoticeFiles(List<FileAttachInfo> files) {
        return files.stream()
                .map(this::createOrUpdateNoticeFiles)
                .collect(Collectors.toList());
    }

    private NoticeFile createOrUpdateNoticeFiles(FileAttachInfo file) {
        Integer attachFile = JasyptUtil.getDecryptor(file.getFileAttachCode());
        NoticeFile noticeFile = this.noticeFiles.stream()
                .filter(it -> it.getNotice().getNoticeNo().equals(this.noticeNo) && it.getAttachFile().equals(attachFile))
                .findFirst()
                .orElseGet(() -> NoticeFile.from(this));
        if(attachFile != noticeFile.getAttachFile()) noticeFile.setAttachFile(attachFile);
        noticeFile.setUseYesNo('Y');
        noticeFile.setUpdater(this.updater);
        return noticeFile;
    }

    private void sortNoticeFiles() {
        int index = 1;
        for (NoticeFile noticeFile: this.noticeFiles) {
            noticeFile.setDetailSequence(index);
            noticeFile.setSortSequence(index);
            index++;
        }
    }
}
