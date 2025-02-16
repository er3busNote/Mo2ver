package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.common.file.dto.FileDto;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.display.dao.BannerDetailRepository;
import com.mo2ver.web.domain.display.dao.BannerManageRepository;
import com.mo2ver.web.domain.display.domain.BannerDetail;
import com.mo2ver.web.domain.display.domain.BannerManage;
import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.member.domain.Member;
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
    public Page<BannerDto> findBannerlist(Pageable pageable) {
        Page<BannerManage> manage = this.bannerManageRepository.findAll(pageable);
        return manage.map(BannerDto::toDTO);
    }

    @Transactional
    public Map<String, Map<String, List<Object>>> findBannerDisplay() {
        Map<String, List<BannerDetailDto>> bannerDetailGroupDto = this.bannerManageRepository.findGroupBannerDetail();
        Map<String, List<BannerProductDto>> bannerProductGroupDto = this.bannerManageRepository.findGroupBannerProduct();

        Map<String, Map<String, List<Object>>> bannerDisplay = new HashMap<>();

        for (String detailKey : bannerDetailGroupDto.keySet()) {
            bannerDisplay
                    .computeIfAbsent(detailKey, k -> new HashMap<>())
                    .put("detail", new ArrayList<>(bannerDetailGroupDto.get(detailKey)));
        }

        for (String productKey : bannerProductGroupDto.keySet()) {
            bannerDisplay
                    .computeIfAbsent(productKey, k -> new HashMap<>())
                    .put("product", new ArrayList<>(bannerProductGroupDto.get(productKey)));
        }

        return bannerDisplay;
    }

    @Transactional
    public BannerImageDto findBannerImagesDetail(BannerDto bannerDto) {
        return this.bannerManageRepository.findBannerDetail(bannerDto);
    }

    @Transactional
    public GoodsDisplayDto findBannerGoodsDetail(BannerDto bannerDto) {
        return this.bannerManageRepository.findBannerProduct(bannerDto);
    }

    @Transactional
    public void saveGoodsDisplay(GoodsDisplayDto goodsDisplayDto, Member currentUser) {
        this.bannerManageRepository.save(BannerManage.of(goodsDisplayDto, currentUser));
    }

    @Transactional
    public void saveImageBanner(List<MultipartFile> files, BannerImageDto bannerImageDto, Member currentUser) throws Exception {
        BannerManage bannerManage = this.bannerManageRepository.save(BannerManage.of(bannerImageDto, currentUser));
        List<BannerImageDetailDto> listBannerImageDetailDto = bannerImageDto.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailDto.size(); i++) {
            BannerImageDetailDto bannerImageDetailDto = listBannerImageDetailDto.get(i);
            log.info("bannerImageInfo => {}", bannerImageDetailDto.getTitle());
            MultipartFile file = files.get(i);
            FileDto fileDto = this.fileService.saveFile(file, BANNER_DIRECTORY, currentUser);
            this.bannerDetailRepository.save(BannerDetail.of(bannerManage, bannerImageDetailDto, fileDto.getFileCode(), i+1, currentUser));
        }
    }
}