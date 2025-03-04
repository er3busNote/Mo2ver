package com.mo2ver.web.event;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventResponse;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.event.service.EventService;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EventTest extends CsrfConfigTest {

    @Autowired
    private EventService eventService;

    @Test
    @DisplayName("이벤트 리스트 정보 확인")
    public void findEventListTest() throws Exception {

        mockMvc.perform(get("/event/list")
                        .param("page", "0")
                        .param("size", "12"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("이벤트 상세 정보 확인")
    public void findEventInfoTest() throws Exception {

        Pageable pageable = PageRequest.of(0, 12, Sort.Direction.DESC, "eventManageNo");
        Page<EventResponse> pages = eventService.findEventlist(pageable);
        List<EventResponse> listEventResponse = pages.get().collect(Collectors.toList());
        EventResponse eventResponse = listEventResponse.get(0);

        mockMvc.perform(get("/event/info/{id}", eventResponse.getEventManageNo())
                        .param("page", "0")
                        .param("size", "12"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("이벤트 상세 정보 관리자 조회")
    public void findEventDetailTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        EventRequest eventRequest = this.getEventRequest();

        mockMvc.perform(post("/event/detail")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(eventRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private EventRequest getEventRequest() {
        return EventRequest.builder()
                .eventManageNo(24L)
                .build();
    }

    @Test
    @DisplayName("이벤트 이미지정보 저장 확인")
    public void createEventImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        EventImageInfo eventImageInfo = this.getEventImageInfo();

        mockMvc.perform(post("/event/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(eventImageInfo)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("이벤트 이미지정보 수정 확인")
    public void updateEventImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        EventImageInfo eventImageInfo = this.getEventImageInfo();

        mockMvc.perform(patch("/event/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(eventImageInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private EventImageInfo getEventImageInfo() {
        return EventImageInfo.builder()
                .eventNo(24L)
                .title("테스트")
                .startDate(new Date())
                .endDate(new Date())
                .displayFile(FileAttachInfo.from(100011))
                .eventFile(FileAttachInfo.from(100012))
                .useyn('Y')
                .goods(Arrays.asList(
                        this.getEventProductInfo(1),
                        this.getEventProductInfo(2)
                ))
                .build();
    }

    private EventImageProductInfo getEventProductInfo(Integer i) {
        return EventImageProductInfo.builder()
                .goodsCode("100000000" + i)
                .goodsName("테스트")
                .sortSequence(i)
                .build();
    }
}
