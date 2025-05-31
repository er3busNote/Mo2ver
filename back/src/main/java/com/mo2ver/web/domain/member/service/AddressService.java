package com.mo2ver.web.domain.member.service;

import com.mo2ver.web.domain.member.dto.AddressInfo;
import com.mo2ver.web.domain.member.entity.Address;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.AddressRepository;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;

    @Transactional
    public Long saveAddress(AddressInfo addressInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Address address = new Address(addressInfo, member);
        return this.addressRepository.save(address).getAddressNo();
    }

    @Transactional
    public void updateAddress(AddressInfo addressInfo, Member currentUser) {
        Address address = this.findAddressById(addressInfo.getAddressNo());
        address.update(addressInfo, currentUser);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Address findAddressById(long id) {
        return this.addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주소록정보 입니다."));
    }
}
