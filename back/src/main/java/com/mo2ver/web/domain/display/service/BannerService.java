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
import com.mo2ver.web.global.common.util.CryptoUtil;
import com.mo2ver.web.global.common.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
public class BannerService {

    private static final String BANNER_DIRECTORY = "banner";

    @Autowired
    protected BannerManageRepository bannerManageRepository;
    @Autowired
    protected BannerDetailRepository bannerDetailRepository;
    @Autowired
    protected FileUtil fileUtil;
    @Autowired
    protected CryptoUtil cryptoUtil;

    public byte[] findBannerImage(String id) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(BANNER_DIRECTORY);
        String targetFileName = findFilesWithPrefix(uploadDirectory, id + ".");
        File targetFile = this.fileUtil.getTargetFile(uploadDirectory, targetFileName);
        return this.cryptoUtil.decryptFile(targetFile.getAbsolutePath());
    }

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
    public void saveImageBanner(List<MultipartFile> files, BannerImageDto bannerImageDto, Member currentUser) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(BANNER_DIRECTORY);
        BannerManage bannerManage = this.bannerManageRepository.save(BannerManage.of(bannerImageDto, currentUser));
        List<BannerImageDetailDto> listBannerImageDetailDto = bannerImageDto.getBnnrImg();
        for (int i = 0; i < listBannerImageDetailDto.size(); i++) {
            BannerImageDetailDto bannerImageDetailDto = listBannerImageDetailDto.get(i);
            log.info("bannerImageInfo => {}", bannerImageDetailDto.getTitle());
            MultipartFile file = files.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = this.fileUtil.getFileExtension(Objects.requireNonNull(fileName));
            String fileNameWithoutExtension = this.fileUtil.removeFileExtension(fileName);
            BannerDetail bannerDetail = this.bannerDetailRepository.save(BannerDetail.of(bannerManage, bannerImageDetailDto, fileNameWithoutExtension, i+1, currentUser));
            File targetFile = this.fileUtil.getTargetFile(uploadDirectory, bannerDetail.getBannerDetailId() + "." + fileExtension);
            this.cryptoUtil.encryptFile(file, targetFile);  // 파일 저장
        }
    }

    // 임시 조치 → 나중에 테이블(DP_BNNR_DTL)에 컬럼(BNNR_IMG_EXT)을 추가로 만들어 주어야 함
    private static String findFilesWithPrefix(Path directoryPath, String prefix) throws IOException {
        List<Path> matchedFiles = Files.walk(Paths.get(directoryPath.toAbsolutePath().toString()))
                .filter(Files::isRegularFile)
                .map(Path::getFileName)
                .filter(fileName -> fileName.getFileName().toString().startsWith(prefix))
                .collect(Collectors.toList());
        if (!matchedFiles.isEmpty()) {
            for (Path file : matchedFiles) {
                return file.getFileName().toString();
            }
        }
        throw new IOException("해당되는 파일을 찾을 수 없습니다.");
    }
}