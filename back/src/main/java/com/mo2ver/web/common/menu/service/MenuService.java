package com.mo2ver.web.common.menu.service;

import com.mo2ver.web.common.menu.dto.response.GroupMenuResponse;
import com.mo2ver.web.common.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    @Transactional
    public List<GroupMenuResponse> fileMenulistDetail(Integer menuType) {
        return this.menuRepository.findGroupMenuByMenulistDetail(menuType);
    }
}
