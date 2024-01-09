package com.mo2ver.master.domain.goods.service;

import com.mo2ver.master.domain.goods.dao.GoodsRepository;
import com.mo2ver.master.domain.goods.dao.GoodsRepositoryImpl;
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

    @Autowired
    GoodsRepositoryImpl goodsCustomRepository;

    @Transactional
    public GoodsDto selectGoods(String id) {
        Goods goods = this.goodsRepository.findByGoodsCode(id);
        return GoodsDto.toDTO(goods);
    }

    @Transactional
    public Page<GoodsDto> findGoodslist(Pageable pageable, CategoryPageDto categoryPageDto) {
        //Page<Goods> goods = useJpaRepository(pageable, categoryPageDto.getCategoryCode(), categoryPageDto.getCategoryType());
        Page<Goods> goods = useQueryDsl(pageable, categoryPageDto.getCategoryCode(), categoryPageDto.getCategoryType());
        return goods.map(GoodsDto::toDTO);
    }

    // @EntityGraph → 복잡한 연관 관계일수록 속도가 느려짐... → QueryDSL 구성 요소인 QuerydslRepositorySupport으로 해결함
    private Page<Goods> useJpaRepository(Pageable pageable, String categoryCode, Character categoryType) {
        switch(categoryType) {
            case 'L':
                return this.goodsRepository.findByLargeCategoryCode(pageable, categoryCode);
            case 'M':
                return this.goodsRepository.findByMediumCategoryCode(pageable, categoryCode);
            case 'S':
                return this.goodsRepository.findBySmallCategoryCode(pageable, categoryCode);
            default:
                return this.goodsRepository.findAll(pageable);
        }
    }

    private Page<Goods> useQueryDsl(Pageable pageable, String categoryCode, Character categoryType) {
        return this.goodsCustomRepository.findByCategoryCode(pageable, categoryCode, categoryType);
    }
}
