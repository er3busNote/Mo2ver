package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.display.dao.BannerDetailRepository;
import com.mo2ver.web.domain.display.dao.BannerManageRepository;
import com.mo2ver.web.domain.display.domain.BannerDetail;
import com.mo2ver.web.domain.display.domain.BannerManage;
import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.BannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.BannerProductResponse;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
public class BannerService {

    private static final String BANNER_DIRECTORY = "banner";

    @Autowired
    protected FileService fileService;

    @Autowired
    protected BannerManageRepository bannerManageRepository;
    @Autowired
    protected BannerDetailRepository bannerDetailRepository;

    @Transactional
    public Page<BannerInfo> findBannerlist(Pageable pageable) {
        Page<BannerManage> manage = this.bannerManageRepository.findAll(pageable);
        return manage.map(BannerInfo::of);
    }

    @Transactional
    public Map<String, Map<String, List<Object>>> findBannerDisplay() {
        Map<String, List<BannerDetailResponse>> bannerDetailGroupResponse = this.bannerManageRepository.findGroupBannerDetail();
        Map<String, List<BannerProductResponse>> bannerProductGroupResponse = this.bannerManageRepository.findGroupBannerProduct();

        Map<String, Map<String, List<Object>>> bannerDisplay = new HashMap<>();

        for (String detailKey : bannerDetailGroupResponse.keySet()) {
            bannerDisplay
                    .computeIfAbsent(detailKey, k -> new HashMap<>())
                    .put("detail", new ArrayList<>(bannerDetailGroupResponse.get(detailKey)));
        }

        for (String productKey : bannerProductGroupResponse.keySet()) {
            bannerDisplay
                    .computeIfAbsent(productKey, k -> new HashMap<>())
                    .put("product", new ArrayList<>(bannerProductGroupResponse.get(productKey)));
        }

        return bannerDisplay;
    }

    @Transactional
    public BannerImageInfo findBannerImagesDetail(BannerInfo bannerInfo) {
        return this.bannerManageRepository.findBannerDetail(bannerInfo);
    }

    @Transactional
    public GoodsDisplayInfo findBannerGoodsDetail(BannerInfo bannerInfo) {
        return this.bannerManageRepository.findBannerProduct(bannerInfo);
    }

    @Transactional
    public BannerManage saveGoodsDisplay(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        return this.bannerManageRepository.save(BannerManage.of(goodsDisplayInfo, currentUser));
    }

    @Transactional
    public BannerManage saveImageBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        BannerManage bannerManage = this.bannerManageRepository.save(BannerManage.of(bannerImageInfo, currentUser));
        List<BannerImageDetailInfo> listBannerImageDetailInfo = bannerImageInfo.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailInfo.size(); i++) {
            BannerImageDetailInfo bannerImageDetailInfo = listBannerImageDetailInfo.get(i);
            String fileAttachCode = fileService.getFileAttachCode(bannerImageDetailInfo.getFile());
            this.bannerDetailRepository.save(BannerDetail.of(bannerManage, bannerImageDetailInfo, Integer.parseInt(fileAttachCode), i+1, currentUser));
        }
        return bannerManage;
    }

    @Transactional
    public void updateImageBanner(BannerImageInfo bannerImageInfo, Member currentUser)  throws Exception {
        BannerManage bannerManage = this.findBannerManageById(bannerImageInfo.getBannerNo());
        bannerManage.update(bannerImageInfo, currentUser);
    }

    @Transactional
    public BannerManage saveImageBanner(List<MultipartFile> files, BannerImageInfo bannerImageInfo, Member currentUser) throws Exception {
        BannerManage bannerManage = this.bannerManageRepository.save(BannerManage.of(bannerImageInfo, currentUser));
        List<BannerImageDetailInfo> listBannerImageDetailInfo = bannerImageInfo.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailInfo.size(); i++) {
            BannerImageDetailInfo bannerImageDetailInfo = listBannerImageDetailInfo.get(i);
            log.info("bannerImageInfo => {}", bannerImageDetailInfo.getTitle());
            MultipartFile file = files.get(i);
            FileInfo fileInfo = this.fileService.saveFile(file, BANNER_DIRECTORY, currentUser);
            this.bannerDetailRepository.save(BannerDetail.of(bannerManage, bannerImageDetailInfo, fileInfo.getFileCode(), i+1, currentUser));
        }
        return bannerManage;
    }

    private BannerManage findBannerManageById(long id) {
        return this.bannerManageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 배너정보 입니다."));
    }
}