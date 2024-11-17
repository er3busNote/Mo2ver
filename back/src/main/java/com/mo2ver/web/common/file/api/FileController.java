package com.mo2ver.web.common.file.api;

import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.common.file.validation.FileValidator;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping(value = "/file")
public class FileController {

    private final FileService fileService;
    private final ErrorHandler errorHandler;
    private final FileValidator fileValidator;

    public FileController(FileService fileService, ErrorHandler errorHandler, FileValidator fileValidator) {
        this.fileService = fileService;
        this.errorHandler = errorHandler;
        this.fileValidator = fileValidator;
    }

    @GetMapping("/image")
    public ResponseEntity fileImage(@RequestParam String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            byte[] bannerImageBytes = fileService.findFile(id.replace(" ", "+"));
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
    public ResponseEntity uploadFiles(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                      @CurrentUser Member currentUser,
                                      BindingResult result) {
        HashMap<String, Object> response = new HashMap<>();
        fileValidator.validate(files, result);
        if (result.hasErrors()) {
            response.put("error", result.getFieldError());
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, response));
        }
        try {
            return ResponseEntity.ok(fileService.saveFile(files, currentUser));
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
    }


    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
