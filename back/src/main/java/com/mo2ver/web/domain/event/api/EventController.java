package com.mo2ver.web.domain.event.api;

import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.response.EventDetailResponse;
import com.mo2ver.web.domain.event.dto.response.EventResponse;
import com.mo2ver.web.domain.event.dto.request.EventImageRequest;
import com.mo2ver.web.domain.event.service.EventService;
import com.mo2ver.web.domain.event.validation.EventImageValidator;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/event")
public class EventController {

    private final EventService eventService;
    private final ErrorHandler errorHandler;
    private final EventImageValidator eventImageValidator;

    @GetMapping("/info/{id}")
    public ResponseEntity<Page<EventDetailResponse>> infoEvent(
            @PathVariable Integer id,
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventDetailResponse> eventDetails = eventService.findEvent(id, pageable);
        return ResponseEntity.ok().body(eventDetails);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<EventResponse>> listEvent(
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventResponse> pages = eventService.findEventlist(pageable);
        return ResponseEntity.ok().body(pages);
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadEvent(@RequestPart(name = "displayFile") @Valid MultipartFile displayFile,
                                      @RequestPart(name = "eventFile") @Valid MultipartFile eventFile,
                                      @RequestPart(name = "eventProduct") @Valid EventImageRequest eventImageRequest,
                                      @CurrentUser Member currentUser,
                                      BindingResult result) {
        HashMap<String, Object> response = new HashMap<>();
        List<MultipartFile> eventFiles = Arrays.asList(displayFile, eventFile);
        for (MultipartFile file : eventFiles) {
            eventImageValidator.validate(file, result);
            if (result.hasErrors()) {
                response.put("error", result.getFieldError());
                return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, response));
            }
        }
        try {
            Long eventManageNo = eventService.saveImageEvent(eventFiles, eventImageRequest, currentUser);
            return ResponseEntity.created(URI.create("/upload/" + eventManageNo))
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.CREATED.value())
                            .message("배너정보가 저장되었습니다")
                            .build());
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
