package com.mo2ver.web.domain.member.api;

import com.mo2ver.web.domain.member.dto.AddressInfo;
import com.mo2ver.web.domain.member.dto.response.AddressResponse;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.service.AddressService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/info")
    public ResponseEntity<AddressResponse> infoAddress(
            @CurrentUser Member currentUser
    ) {
        AddressResponse addressResponse = addressService.findAddress(currentUser);
        return ResponseEntity.ok().body(addressResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AddressResponse>> listAddress(
            @CurrentUser Member currentUser
    ) {
        List<AddressResponse> listAddressResponse = addressService.findAddresslist(currentUser);
        return ResponseEntity.ok().body(listAddressResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createAddress(
            @RequestBody @Valid AddressInfo addressInfo,
            @CurrentUser Member currentUser
    ) {
        String addressNo = addressService.saveAddress(addressInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + addressNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("주소록정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseHandler> updateAddress(
            @RequestBody @Validated(AddressInfo.Update.class) AddressInfo addressInfo,
            @CurrentUser Member currentUser
    ) {
        addressService.updateAddress(addressInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("주소록정보가 수정되었습니다")
                        .build());
    }
}
