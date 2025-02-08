package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.dto.BannerDetailDto;
import com.mo2ver.web.domain.display.dto.BannerProductDto;

import java.util.List;
import java.util.Map;

public interface BannerManageRepositoryCustom {
    Map<String, List<BannerDetailDto>> findGroupBannerDetail();
    Map<String, List<BannerProductDto>> findGroupBannerProduct();
}
