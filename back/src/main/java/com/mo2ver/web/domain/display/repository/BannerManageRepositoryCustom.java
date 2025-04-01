package com.mo2ver.web.domain.display.repository;

import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.BannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.BannerProductResponse;
import com.mo2ver.web.domain.display.dto.response.BannerKeywordResponse;

import java.util.List;
import java.util.Map;

public interface BannerManageRepositoryCustom {
    BannerImageInfo findBannerDetail(BannerInfo bannerInfo);
    GoodsDisplayInfo findBannerProduct(BannerInfo bannerInfo);
    Map<String, List<BannerDetailResponse>> findGroupBannerDetail();
    Map<String, List<BannerProductResponse>> findGroupBannerProduct();
    Map<String, List<BannerKeywordResponse>> findGroupBannerKeyword();
}
