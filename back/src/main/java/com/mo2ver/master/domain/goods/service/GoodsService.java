package com.mo2ver.master.domain.goods.service;

import com.mo2ver.master.domain.goods.dao.GoodsRepository;
import com.mo2ver.master.domain.goods.domain.Goods;
import com.mo2ver.master.domain.goods.dto.GoodsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class GoodsService {

    @Autowired
    GoodsRepository goodsRepository;

    @Transactional
    public Page<GoodsDto> findGoodslist(Pageable pageable) {
        Page<Goods> goods = this.goodsRepository.findAll(pageable);
        return goods.map(data -> GoodsDto.toDTO(data));
    }
}
