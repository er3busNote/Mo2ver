package com.mo2ver.web.domain.event.api;

import com.mo2ver.web.domain.event.dto.EventDetailDto;
import com.mo2ver.web.domain.event.dto.EventDto;
import com.mo2ver.web.domain.event.dto.EventImageDto;
import com.mo2ver.web.domain.event.service.EventService;
import com.mo2ver.web.domain.event.validation.EventImageValidator;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageDto;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping(value = "/event")
public class EventController {

    private final EventService eventService;
    private final ErrorHandler errorHandler;
    private final EventImageValidator eventImageValidator;

    public EventController(EventService eventService, ErrorHandler errorHandler, EventImageValidator eventImageValidator) {
        this.eventService = eventService;
        this.errorHandler = errorHandler;
        this.eventImageValidator = eventImageValidator;
    }

    @GetMapping("/info/{id}")
    public ResponseEntity infoEvent(@PathVariable Integer id,
                                    @Valid PageDto pageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventDetailDto> eventDetailDto = eventService.findEvent(id, pageable);
        return ResponseEntity.ok(eventDetailDto);
    }

    @GetMapping("/list")
    public ResponseEntity listEvent(@Valid PageDto pageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "eventManageNo");
        Page<EventDto> pages = eventService.findEventlist(pageable);
        return ResponseEntity.ok(pages);
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadEvent(@RequestPart(name = "displayFile") @Valid MultipartFile displayFile,
                                      @RequestPart(name = "eventFile") @Valid MultipartFile eventFile,
                                      @RequestPart(name = "eventProduct") @Valid EventImageDto eventImageDto,
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
            eventService.saveImageEvent(eventFiles, eventImageDto, currentUser);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
        return new ResponseEntity(new ResponseDto(HttpStatus.CREATED.value(), "배너정보가 저장되었습니다"), HttpStatus.CREATED);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
