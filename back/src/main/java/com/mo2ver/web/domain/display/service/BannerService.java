package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.domain.display.entity.Banner;
import com.mo2ver.web.domain.display.repository.BannerRepository;
import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.BannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.BannerProductResponse;
import com.mo2ver.web.domain.display.dto.response.BannerKeywordResponse;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    @Transactional
    public Page<BannerInfo> findBannerlist(Pageable pageable) {
        Page<Banner> manage = this.bannerRepository.findAll(pageable);
        return manage.map(BannerInfo::of);
    }

    @Transactional
    public Map<String, Map<String, List<Object>>> findBannerDisplay() {
        Map<String, List<BannerDetailResponse>> bannerDetailGroupResponse = this.bannerRepository.findGroupBannerDetail();
        Map<String, List<BannerProductResponse>> bannerProductGroupResponse = this.bannerRepository.findGroupBannerProduct();
        Map<String, List<BannerKeywordResponse>> bannerKeywordGroupResponse = this.bannerRepository.findGroupBannerKeyword();

        Map<String, Map<String, List<Object>>> bannerDisplay = new HashMap<>();

        for (String detailKey : bannerDetailGroupResponse.keySet()) {
            bannerDisplay.computeIfAbsent(detailKey, k -> new HashMap<>())
                    .put("detail", new ArrayList<>(bannerDetailGroupResponse.get(detailKey)));
        }

        for (String productKey : bannerProductGroupResponse.keySet()) {
            bannerDisplay.computeIfAbsent(productKey, k -> new HashMap<>())
                    .put("product", new ArrayList<>(bannerProductGroupResponse.get(productKey)));
        }

        for (String keywordKey : bannerKeywordGroupResponse.keySet()) {
            bannerDisplay.computeIfAbsent(keywordKey, k -> new HashMap<>())
                    .put("keyword", new ArrayList<>(bannerKeywordGroupResponse.get(keywordKey)));
        }

        return bannerDisplay;
    }

    @Transactional
    public BannerImageInfo findBannerImagesDetail(BannerInfo bannerInfo) {
        return this.bannerRepository.findBannerDetail(bannerInfo);
    }

    @Transactional
    public GoodsDisplayInfo findBannerGoodsDetail(BannerInfo bannerInfo) {
        return this.bannerRepository.findBannerProduct(bannerInfo);
    }

    @Transactional
    public String saveGoodsDisplay(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        Banner banner = new Banner(goodsDisplayInfo, currentUser);
        return this.bannerRepository.save(banner).getBannerNo();
    }

    @Transactional
    public void updateGoodsDisplay(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        Banner banner = this.findBannerById(goodsDisplayInfo.getBannerNo());
        banner.update(goodsDisplayInfo, currentUser);
    }

    @Transactional
    public String saveImagesBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        Banner banner = new Banner(bannerImageInfo, currentUser);
        return this.bannerRepository.save(banner).getBannerNo();
    }

    @Transactional
    public void updateImagesBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        Banner banner = this.findBannerById(bannerImageInfo.getBannerNo());
        banner.update(bannerImageInfo, currentUser);
    }

    private Banner findBannerById(String bannerNo) {
        return this.bannerRepository.findById(bannerNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 배너정보 입니다."));
    }
}