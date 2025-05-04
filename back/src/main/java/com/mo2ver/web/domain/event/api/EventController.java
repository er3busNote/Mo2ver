package com.mo2ver.web.domain.event.api;

import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.event.dto.response.EventResponse;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.service.EventService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/event")
public class EventController {

    private final EventService eventService;

    @GetMapping("/info/{id}")
    public ResponseEntity<EventResponse> infoEvent(
            @PathVariable Integer id,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(eventService.findEvent(id));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Page<EventProductResponse>> productEvent(
            @PathVariable Integer id,
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventProductResponse> eventDetails = eventService.findEvent(id, pageable);
        return ResponseEntity.ok().body(eventDetails);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<EventResponse>> listEvent(
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventResponse> pages = eventService.findEventlist(pageable, currentUser);
        return ResponseEntity.ok().body(pages);
    }

    @PostMapping("/detail")
    public ResponseEntity<EventImageInfo> eventDetail(
            @RequestBody @Valid EventRequest eventRequest,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(eventService.findEventDetail(eventRequest));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createEvent(
            @RequestBody @Valid EventImageInfo eventImageInfo,
            @CurrentUser Member currentUser
    ) {
        Long eventManageNo = eventService.saveImageEvent(eventImageInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + eventManageNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("이벤트정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseHandler> updateEvent(
            @RequestBody @Validated(EventImageInfo.Update.class) EventImageInfo eventImageInfo,
            @CurrentUser Member currentUser
    ) {
        eventService.updateImageEvent(eventImageInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("이벤트정보가 수정되었습니다")
                        .build());
    }
}
