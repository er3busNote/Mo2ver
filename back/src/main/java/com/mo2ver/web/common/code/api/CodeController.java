package com.mo2ver.web.common.code.api;

import com.mo2ver.web.common.code.service.CodeService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/code")
public class CodeController {

    private final CodeService codeService;

    public CodeController(CodeService codeService) {
        this.codeService = codeService;
    }

    @PostMapping("/list")
    public ResponseEntity listCode(@RequestBody List<String> groupCodelist,
                                   @CurrentUser Member currentUser) {
        return ResponseEntity.ok(codeService.fileCodelist(groupCodelist));
    }
    @PostMapping("/list/detail")
    public ResponseEntity listCodeDetail(@RequestBody List<String> groupCodelist,
                                         @CurrentUser Member currentUser) {
        return ResponseEntity.ok(codeService.fileCodelistDetail(groupCodelist));
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
