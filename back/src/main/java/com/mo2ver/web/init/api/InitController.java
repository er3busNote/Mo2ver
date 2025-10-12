package com.mo2ver.web.init.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.auth.AuthManager;
import com.mo2ver.web.global.common.profile.ProfileHelper;
import com.mo2ver.web.init.service.InitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/init")
public class InitController {

    private final InitService initService;

    @GetMapping("/members")
    public ResponseEntity<String> initializeMembers(HttpServletRequest request, @CurrentUser Member currentUser) {
        if (!ProfileHelper.isLocalhost(request)) {  // 로컬호스트이면 Bypass
            if (!AuthManager.isAdmin(currentUser.getRoles())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다.");
            }
        }

        initService.initMembers();
        return ResponseEntity.ok("초기 멤버 등록 완료");
    }
}
