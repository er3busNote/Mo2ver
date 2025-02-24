package com.mo2ver.web.common.code.api;

import com.mo2ver.web.common.code.dto.response.CodeResponse;
import com.mo2ver.web.common.code.dto.response.GroupCodeResponse;
import com.mo2ver.web.common.code.service.CodeService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/code")
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/list")
    public ResponseEntity<Map<String, List<CodeResponse>>> listCode(
            @RequestBody List<String> groupCodelist,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(codeService.fileCodelist(groupCodelist));
    }
    @PostMapping("/list/detail")
    public ResponseEntity<List<GroupCodeResponse>> listCodeDetail(
            @RequestBody List<String> groupCodelist,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(codeService.fileCodelistDetail(groupCodelist));
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
