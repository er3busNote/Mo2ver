package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.common.file.dto.FileAttachDto;
import com.mo2ver.web.common.file.dto.FileDto;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.goods.dao.*;
import com.mo2ver.web.domain.goods.domain.Discount;
import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.domain.GoodsImage;
import com.mo2ver.web.domain.goods.domain.Price;
import com.mo2ver.web.domain.goods.dto.request.CategoryPageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GoodsService {

    private static final String GOODS_DIRECTORY = "goods";

    @Autowired
    protected FileService fileService;

    @Autowired
    protected GoodsRepository goodsRepository;
    @Autowired
    protected PriceRepository priceRepository;
    @Autowired
    protected DiscountRepository discountRepository;
    @Autowired
    protected GoodsImageRepository goodsImageRepository;

    @Transactional
    public GoodsResponse findGoods(String id) {
        Goods goods = this.goodsRepository.findByGoodsCode(id);
        return GoodsResponse.of(goods);
    }

    @Transactional
    public Page<GoodsResponse> findGoodslist(Pageable pageable, CategoryPageRequest categoryPageRequest) {
        //Page<Goods> goods = useJpaRepository(pageable, categoryPageDto.getCategoryCode(), categoryPageDto.getCategoryType());
        Page<Goods> goods = useQueryDsl(pageable, categoryPageRequest.getCategoryCode(), categoryPageRequest.getCategoryType());
        return goods.map(GoodsResponse::of);
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
        return this.goodsRepository.findByCategoryCode(pageable, categoryCode, categoryType);
    }

    @Transactional
    public List<GoodsResponse> findGoodslistRank(Integer count) {
        List<Goods> goods = this.goodsRepository.findByGoodsRank(count);
        return goods.stream().map(GoodsResponse::of).collect(Collectors.toList());
    }

    @Transactional
    public Page<GoodsResponse> findGoodsSearch(Pageable pageable, GoodsSearchRequest goodsSearchRequest) {
        Page<Goods> goods = this.goodsRepository.findByGoodsName(pageable, goodsSearchRequest);
        return goods.map(GoodsResponse::of);
    }

    @Transactional
    public Price saveImageGoods(GoodsImageAttachRequest goodsImageAttachRequest, Member currentUser) throws Exception {
        Price price = this.priceRepository.save(Price.of(goodsImageAttachRequest, currentUser));
        if (goodsImageAttachRequest.getSalePeriodYesNo() == 'Y') this.discountRepository.save(Discount.of(price.getGoodsCode(), goodsImageAttachRequest, currentUser));
        for (int i = 0; i < goodsImageAttachRequest.getGoodsImg().size(); i++) {
            FileAttachDto fileAttachDto = goodsImageAttachRequest.getGoodsImg().get(i);
            String fileAttachCode = fileService.getFileAttachCode(fileAttachDto.getFileAttachCode());
            Character basicImageYesNo = 'N';
            if (i == 0) basicImageYesNo = 'Y';
            this.goodsImageRepository.save(GoodsImage.of(price.getGoodsCode(), Integer.parseInt(fileAttachCode), basicImageYesNo, fileAttachDto.getFileExtension(), i+1, currentUser));
        }
        return price;
    }

    @Transactional
    public Price saveImageGoods(List<MultipartFile> files, GoodsImageRequest goodsImageRequest, Member currentUser) throws Exception {
        Price price = this.priceRepository.save(Price.of(goodsImageRequest, currentUser));
        if (goodsImageRequest.getSalePeriodYesNo() == 'Y') this.discountRepository.save(Discount.of(price.getGoodsCode(), goodsImageRequest, currentUser));
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            Character basicImageYesNo = getBasicImageYesNo(i);
            FileDto fileDto = this.fileService.saveFile(file, GOODS_DIRECTORY, currentUser);
            this.goodsImageRepository.save(GoodsImage.of(price.getGoodsCode(), fileDto.getFileCode(), basicImageYesNo, fileDto.getFileExtension(), i+1, currentUser));
        }
        return price;
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
