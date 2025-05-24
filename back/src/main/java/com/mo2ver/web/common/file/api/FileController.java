package com.mo2ver.web.common.file.api;

import com.mo2ver.web.common.file.dto.response.FileResponse;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.common.file.validation.ValidFileList;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.mo2ver.web.global.error.type.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/file")
public class FileController {

    private final FileService fileService;
    private final ErrorHandler errorHandler;

    @GetMapping("/image")
    public ResponseEntity<?> fileImage(@RequestParam String id) {
        try {
            FileResponse fileResponse = this.findFile(id);
            return ResponseEntity.ok().contentType(fileResponse.getMediaType())
                    .body(fileResponse.getResource());
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String id) {
        try {
            FileResponse fileResponse = this.findFile(id);
            return ResponseEntity.ok().contentType(fileResponse.getMediaType())
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment")
                    .body(fileResponse.getResource());
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadFiles(@RequestParam(name = "files") @Valid @ValidFileList List<MultipartFile> files,
                                      @CurrentUser Member currentUser) {
        try {
            return ResponseEntity.ok().body(fileService.saveFile(files, currentUser));
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    @PostMapping(value = "/upload/bucket", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadBucketFiles(@RequestParam(name = "files") @Valid @ValidFileList List<MultipartFile> files,
                                            @CurrentUser Member currentUser) {
        try {
            return ResponseEntity.ok().body(fileService.saveBucketFile(files, currentUser));
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    private FileResponse findFile(String id) throws Exception {
        Integer attachFile = JasyptUtil.getDecryptor(id);
        byte[] fileBytes = fileService.findFile(attachFile);
        ByteArrayResource resource = new ByteArrayResource(fileBytes);
        MediaType mediaType = this.findMediaType(fileBytes);
        return FileResponse.of(resource, mediaType);
    }

    private MediaType findMediaType(byte[] fileBytes) {
        Tika tika = new Tika();
        String tikaMimeType = tika.detect(fileBytes);
        return MediaType.parseMediaType(tikaMimeType);
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
