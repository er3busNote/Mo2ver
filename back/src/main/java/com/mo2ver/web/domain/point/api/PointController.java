package com.mo2ver.web.domain.point.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.point.dto.request.PointRequest;
import com.mo2ver.web.domain.point.service.PointService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/point")
public class PointController {

    private final PointService pointService;

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createPoint(
            @RequestBody @Valid PointRequest pointRequest,
            @CurrentUser Member currentUser
    ) {
        String pointNo = pointService.savePoint(pointRequest, currentUser);
        return ResponseEntity.created(URI.create("/create/" + pointNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("쿠폰정보가 저장되었습니다")
                        .build());
    }
}
