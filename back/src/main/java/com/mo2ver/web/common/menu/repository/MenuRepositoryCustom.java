package com.mo2ver.web.common.menu.repository;

import com.mo2ver.web.common.menu.dto.response.GroupMenuResponse;

import java.util.List;

public interface MenuRepositoryCustom {
    List<GroupMenuResponse> findGroupMenuByMenulistDetail(Integer menuType);
}
