package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.dto.*;

import java.util.List;
import java.util.Map;

public interface BannerManageRepositoryCustom {
    BannerImageDto findBannerDetail(BannerDto bannerDto);
    GoodsDisplayDto findBannerProduct(BannerDto bannerDto);
    Map<String, List<BannerDetailDto>> findGroupBannerDetail();
    Map<String, List<BannerProductDto>> findGroupBannerProduct();
}
