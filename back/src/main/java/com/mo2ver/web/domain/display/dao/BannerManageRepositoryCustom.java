package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.BannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.BannerProductResponse;

import java.util.List;
import java.util.Map;

public interface BannerManageRepositoryCustom {
    BannerImageDto findBannerDetail(BannerDto bannerDto);
    GoodsDisplayDto findBannerProduct(BannerDto bannerDto);
    Map<String, List<BannerDetailResponse>> findGroupBannerDetail();
    Map<String, List<BannerProductResponse>> findGroupBannerProduct();
}
