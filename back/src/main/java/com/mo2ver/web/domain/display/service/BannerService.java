package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.domain.display.dao.BannerDetailRepository;
import com.mo2ver.web.domain.display.dao.BannerManageRepository;
import com.mo2ver.web.domain.display.domain.BannerDetail;
import com.mo2ver.web.domain.display.domain.BannerManage;
import com.mo2ver.web.domain.display.dto.BannerImageDetailDto;
import com.mo2ver.web.domain.display.dto.BannerDto;
import com.mo2ver.web.domain.display.dto.BannerImageDto;
import com.mo2ver.web.domain.display.dto.GoodsDisplayDto;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.properties.ImagesProperties;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class BannerService {

    @Autowired
    protected BannerManageRepository bannerManageRepository;
    @Autowired
    protected BannerDetailRepository bannerDetailRepository;
    @Autowired
    protected ImagesProperties imagesProperties;

    @Transactional
    public Page<BannerDto> findBannerlist(Pageable pageable) {
        Page<BannerManage> manage = this.bannerManageRepository.findAll(pageable);
        return manage.map(BannerDto::toDTO);
    }

    @Transactional
    public void saveGoodsDisplay(GoodsDisplayDto goodsDisplayDto, Member currentUser) {
        this.bannerManageRepository.save(BannerManage.of(goodsDisplayDto, currentUser));
    }

    @Transactional
    public void saveImageBanner(List<MultipartFile> files, BannerImageDto bannerImageDto, Member currentUser) throws IOException {
        String projectDir = System.getProperty("user.dir");
        Path folderPath = Paths.get(imagesProperties.getFilepath());
        Path uploadDirectory = folderPath.resolve("banner");
        this.createDirectory(uploadDirectory.toString()); // 업로드할 디렉토리가 없으면 생성

        BannerManage bannerManage = this.bannerManageRepository.save(BannerManage.of(bannerImageDto, currentUser));
        List<BannerImageDetailDto> listBannerImageDetailDto = bannerImageDto.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailDto.size(); i++) {
            BannerImageDetailDto bannerImageDetailDto = listBannerImageDetailDto.get(i);
            log.info("bannerImageInfo => {}", bannerImageDetailDto.getTitle());
            MultipartFile file = files.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(Objects.requireNonNull(fileName));
            String fileNameWithoutExtension = removeFileExtension(fileName);
            BannerDetail bannerDetail = this.bannerDetailRepository.save(BannerDetail.of(bannerManage, bannerImageDetailDto, fileNameWithoutExtension, i+1, currentUser));
            File targetFile = new File(projectDir + "/" + uploadDirectory + "/" + bannerDetail.getBannerDetailId() + "." + fileExtension);
            file.transferTo(targetFile); // 파일 저장
        }
    }

    private void createDirectory(String uploadDirectory) {
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    private String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(lastDotIndex + 1);
        }
        return "";
    }

    private String removeFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(0, lastDotIndex);
        }
        return fileName;
    }
}