package com.mo2ver.web.common.file.api;

import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.common.file.validation.ValidFileList;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/file")
public class FileController {

    private final FileService fileService;
    private final ErrorHandler errorHandler;

    @GetMapping("/image")
    public ResponseEntity fileImage(@RequestParam String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String fileAttachCode = fileService.getFileAttachCode(id);
            byte[] bannerImageBytes = fileService.findFile(fileAttachCode);
            ByteArrayResource resource = new ByteArrayResource(bannerImageBytes);
            Tika tika = new Tika();
            String tikaMimeType = tika.detect(bannerImageBytes);
            MediaType mediaType = MediaType.parseMediaType(tikaMimeType);
            return ResponseEntity.ok().contentType(mediaType).body(resource);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadFiles(@RequestParam(name = "files") @Valid @ValidFileList List<MultipartFile> files,
                                      @CurrentUser Member currentUser) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            return ResponseEntity.ok().body(fileService.saveFile(files, currentUser));
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
