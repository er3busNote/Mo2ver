package com.mo2ver.web.common.menu.api;

import com.mo2ver.web.common.menu.dto.response.GroupMenuResponse;
import com.mo2ver.web.common.menu.service.MenuService;
import com.mo2ver.web.common.menu.type.MenuType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/menu")
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/list/{menuType}")
    public ResponseEntity<List<GroupMenuResponse>> listCodeDetail(
            @PathVariable MenuType menuType
    ) {
        return ResponseEntity.ok().body(menuService.fileMenulistDetail(menuType));
    }
}
