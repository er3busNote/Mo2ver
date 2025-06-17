package com.mo2ver.web.domain.member.dto.response;

import com.mo2ver.web.domain.member.entity.Address;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressResponse {

    private String addressNo;
    private String memberName;
    private String cellPhoneNumber;
    private String zipcode;
    private String roadNameBasicAddress;
    private String roadNameDetailAddress;

    public static AddressResponse from() {
        return new AddressResponse();
    }

    public static AddressResponse of(Address address) {
        return AddressResponse.builder()
                .addressNo(address.getAddressNo())
                .memberName(address.getMemberName())
                .cellPhoneNumber(address.getCellPhoneNumber())
                .zipcode(address.getZipcode())
                .roadNameBasicAddress(address.getRoadNameBasicAddress())
                .roadNameDetailAddress(address.getRoadNameDetailAddress())
                .build();
    }
}
