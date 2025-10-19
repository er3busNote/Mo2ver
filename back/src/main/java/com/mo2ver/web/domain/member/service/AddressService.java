package com.mo2ver.web.domain.member.service;

import com.mo2ver.web.domain.member.dto.response.http.Juso;
import com.mo2ver.web.domain.member.dto.response.http.JusoResponse;
import com.mo2ver.web.domain.member.dto.AddressInfo;
import com.mo2ver.web.domain.member.dto.response.AddressResponse;
import com.mo2ver.web.domain.member.entity.Address;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.AddressRepository;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.http.WebHttpClient;
import com.mo2ver.web.global.common.setting.AddressSetting;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final AddressSetting addressSetting;

    @Transactional
    public AddressResponse findAddress(Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        List<Address> listAddress = this.addressRepository.findByMember(member);
        return listAddress.stream().filter(address -> address.getBasicPlaceYesNo() == 'Y')
                .findFirst().map(AddressResponse::of)
                .orElseGet(AddressResponse::from);
    }

    @Transactional
    public List<AddressResponse> findAddresslist(Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        List<Address> listAddress = this.addressRepository.findByMember(member);
        return listAddress.stream().map(AddressResponse::of).collect(Collectors.toList());
    }

    public List<Juso> searchAddress(String keyword, PageInfo pageInfo) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("currentPage", Integer.toString(pageInfo.getPage()));
        params.add("countPerPage", Integer.toString(pageInfo.getSize()));
        params.add("keyword", keyword);
        params.add("confmKey", addressSetting.getConfmKey());
        params.add("resultType", "json");

        String url = addressSetting.getBaseUrl();
        JusoResponse response = WebHttpClient.get(url, params, JusoResponse.class);
        return response.getResults().getJuso();
    }

    @Transactional
    public String saveAddress(AddressInfo addressInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Long count = this.addressRepository.countByMember(member);
        Address address = new Address(addressInfo, member, count);
        return this.addressRepository.save(address).getAddressNo();
    }

    @Transactional
    public void updateAddress(AddressInfo addressInfo, Member currentUser) {
        Address address = this.findAddressById(addressInfo.getAddressNo());
        address.update(addressInfo, currentUser);
    }

    @Transactional
    public void updateBasicAddress(String addressNo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        List<Address> listAddress = this.addressRepository.findByMember(member);
        for(Address address : listAddress) {
            if(Objects.equals(addressNo, address.getAddressNo())) {
                address.update('Y');
            } else {
                address.update('N');
            }
        }
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Address findAddressById(String addressNo) {
        return this.addressRepository.findById(addressNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주소록정보 입니다."));
    }
}
