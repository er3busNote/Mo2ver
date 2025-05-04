package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.display.entity.Banner;
import com.mo2ver.web.domain.display.repository.BannerDetailRepository;
import com.mo2ver.web.domain.display.repository.BannerRepository;
import com.mo2ver.web.domain.display.entity.BannerDetail;
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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {

    private static final String BANNER_DIRECTORY = "banner";

    private final FileService fileService;
    private final BannerRepository bannerRepository;
    private final BannerDetailRepository bannerDetailRepository;

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
    public Long saveGoodsDisplay(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        Banner banner = new Banner(goodsDisplayInfo, currentUser);
        return this.bannerRepository.save(banner).getBannerManageNo();
    }

    @Transactional
    public void updateGoodsDisplay(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        Banner banner = this.findBannerManageById(goodsDisplayInfo.getBannerNo());
        banner.update(goodsDisplayInfo, currentUser);
    }

    @Transactional
    public Long saveImagesBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        Banner banner = new Banner(bannerImageInfo, currentUser);
        return this.bannerRepository.save(banner).getBannerManageNo();
    }

    @Transactional
    public void updateImagesBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        Banner banner = this.findBannerManageById(bannerImageInfo.getBannerNo());
        banner.update(bannerImageInfo, currentUser);
    }

    @Transactional
    public Long saveImagesBanner(List<MultipartFile> files, BannerImageInfo bannerImageInfo, Member currentUser) throws Exception {
        Banner banner = this.bannerRepository.save(Banner.of(bannerImageInfo, currentUser));
        List<BannerImageDetailInfo> listBannerImageDetailInfo = bannerImageInfo.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailInfo.size(); i++) {
            BannerImageDetailInfo bannerImageDetailInfo = listBannerImageDetailInfo.get(i);
            log.info("bannerImageInfo => {}", bannerImageDetailInfo.getTitle());
            MultipartFile file = files.get(i);
            FileInfo fileInfo = this.fileService.saveFile(file, BANNER_DIRECTORY, currentUser);
            this.bannerDetailRepository.save(BannerDetail.of(banner, bannerImageDetailInfo, fileInfo.getFileCode(), i+1, currentUser));
        }
        return banner.getBannerManageNo();
    }

    private Banner findBannerManageById(long id) {
        return this.bannerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 배너정보 입니다."));
    }
}