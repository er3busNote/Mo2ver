package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.domain.display.dao.ManageRepository;
import com.mo2ver.web.domain.display.domain.Manage;
import com.mo2ver.web.domain.display.dto.BannerImageDetailDto;
import com.mo2ver.web.domain.display.dto.BannerDto;
import com.mo2ver.web.domain.display.dto.BannerImageDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class BannerService {

    @Autowired
    protected ManageRepository manageRepository;

    @Autowired
    protected ModelMapper modelMapper;

    @Transactional
    public Page<BannerDto> findBannerlist(Pageable pageable) {
        Page<Manage> manage = this.manageRepository.findAll(pageable);
        //return manage.map(data -> modelMapper.map(data, BannerDto.class));    // LocalDateTime -> Date (Error)
        return manage.map(BannerDto::toDTO);
    }

    @Transactional
    public void saveImageBanner(List<MultipartFile> files, BannerImageDto bannerImageDto) throws IOException {
        List<BannerImageDetailDto> listBannerImageDetailDto = bannerImageDto.getBnnrImg();
        for (int i = 0; i< listBannerImageDetailDto.size(); i++) {
            log.info("bannerImageInfo => {} : {}", listBannerImageDetailDto.get(i).getTitle(), new String(files.get(i).getBytes(), "UTF-8"));
        }
    }
}