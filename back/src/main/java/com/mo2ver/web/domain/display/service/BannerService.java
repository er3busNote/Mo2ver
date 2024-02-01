package com.mo2ver.web.domain.display.service;

import com.mo2ver.web.domain.display.dao.ManageRepository;
import com.mo2ver.web.domain.display.domain.Manage;
import com.mo2ver.web.domain.display.dto.BannerDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
}