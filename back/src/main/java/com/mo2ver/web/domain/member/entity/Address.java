package com.mo2ver.web.domain.member.entity;

import com.mo2ver.web.domain.member.dto.AddressInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "ADDR", // 주소록/배송지
        indexes={
                @Index(name="FK_MBR_TO_ADDR", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "addressNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(generator = "addressNo")
    @GenericGenerator(name = "addressNo", strategy = "com.mo2ver.web.domain.member.entity.AddressGenerator")
    @Column(name = "ADDR_NO", columnDefinition = "CHAR(10) COMMENT '주소록번호'")
    private String addressNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_ADDR"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Column(name = "MBR_NM", nullable = false, columnDefinition = "VARCHAR(50) COMMENT '회원명'")
    @NotBlank
    private String memberName;

    @Column(name = "CP_NO", nullable = false, columnDefinition = "VARCHAR(12) COMMENT '핸드폰번호'")
    @NotBlank
    private String cellPhoneNumber;

    @Column(name = "ZIPCODE", columnDefinition = "CHAR(5) COMMENT '우편번호'")
    private String zipcode;

    @Column(name = "ROAD_NM_BSC_ADDR", columnDefinition = "VARCHAR(255) COMMENT '도로명기본주소'")
    private String roadNameBasicAddress;

    @Column(name = "ROAD_NM_DTL_ADDR", columnDefinition = "VARCHAR(255) COMMENT '도로명상세주소'")
    private String roadNameDetailAddress;

    @Column(name = "BSC_PLC_YN", columnDefinition = "CHAR(1) COMMENT '기본배송지여부'")
    private Character basicPlaceYesNo;

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

    public Address(AddressInfo addressInfo, Member currentUser, Long count) {
        this.createOrUpdateAddress(addressInfo, currentUser);
        this.member = currentUser;
        this.basicPlaceYesNo = createBasicPlaceYesNo(count);
        this.register = currentUser.getMemberNo();
    }

    public void update(AddressInfo addressInfo, Member currentUser) {
        this.createOrUpdateAddress(addressInfo, currentUser);
    }

    private void createOrUpdateAddress(AddressInfo addressInfo, Member currentUser) {
        this.memberName = addressInfo.getMemberName();
        this.cellPhoneNumber = addressInfo.getCellPhoneNumber();
        this.zipcode = addressInfo.getZipcode();
        this.roadNameBasicAddress = addressInfo.getRoadNameBasicAddress();
        this.roadNameDetailAddress = addressInfo.getRoadNameDetailAddress();
        this.updater = currentUser.getMemberNo();
    }

    private Character createBasicPlaceYesNo(Long count) {
        if(count > 0) return 'N';
        return 'Y';
    }
}
