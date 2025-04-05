package com.mo2ver.web.common.menu.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class GroupMenuResponse extends MenuResponse {

    private List<MenuResponse> subMenu;

    @QueryProjection
    public GroupMenuResponse(String menuCode, String menuName, String menuPath, String description, List<MenuResponse> subMenu) {
        super(menuCode, menuName, menuPath, description);
        this.subMenu = subMenu;
    }
}
