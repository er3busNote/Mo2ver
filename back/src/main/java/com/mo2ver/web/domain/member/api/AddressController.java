package com.mo2ver.web.domain.member.api;

import com.mo2ver.web.domain.member.dto.AddressInfo;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/address")
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createAddress(
            @RequestBody @Valid AddressInfo addressInfo,
            @CurrentUser Member currentUser
    ) {
        Long eventManageNo = addressService.saveAddress(addressInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + eventManageNo))
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
