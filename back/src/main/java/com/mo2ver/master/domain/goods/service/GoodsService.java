package com.mo2ver.master.domain.goods.service;

import com.mo2ver.master.domain.goods.dao.GoodsRepository;
import com.mo2ver.master.domain.goods.domain.Goods;
import com.mo2ver.master.domain.goods.dto.CategoryPageDto;
import com.mo2ver.master.domain.goods.dto.GoodsDto;
import com.mo2ver.master.global.common.properties.ImagesProperties;
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
    public GoodsDto selectGoods(String id) {
        Goods goods = this.goodsRepository.findByGoodsCode(id);
        return GoodsDto.toDTO(goods);
    }

    @Transactional
    public Page<GoodsDto> findGoodslist(Pageable pageable, CategoryPageDto categoryPageDto) {
        Page<Goods> goods;
        switch(categoryPageDto.getCategoryType()) {
            case 'L':
                goods = this.getLargeCategoryCode(pageable, categoryPageDto.getCategoryCode());
                break;
            case 'M':
                goods = this.getMediumCategoryCode(pageable, categoryPageDto.getCategoryCode());
                break;
            case 'S':
                goods = this.getSmallCategoryCode(pageable, categoryPageDto.getCategoryCode());
                break;
            default:
                goods = this.getAllCategoryCode(pageable);
                break;
        }
        return goods.map(GoodsDto::toDTO);
    }

    private Page<Goods> getLargeCategoryCode(Pageable pageable, String largeCategoryCode) {
        return this.goodsRepository.findByLargeCategoryCode(pageable, largeCategoryCode);
    }

    private Page<Goods> getMediumCategoryCode(Pageable pageable, String mediumCategoryCode) {
        return this.goodsRepository.findByMediumCategoryCode(pageable, mediumCategoryCode);
    }

    private Page<Goods> getSmallCategoryCode(Pageable pageable, String smallCategoryCode) {
        return this.goodsRepository.findBySmallCategoryCode(pageable, smallCategoryCode);
    }

    private Page<Goods> getAllCategoryCode(Pageable pageable) {
        return this.goodsRepository.findAll(pageable);
    }
}
