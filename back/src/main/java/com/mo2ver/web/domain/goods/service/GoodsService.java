package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.domain.goods.dao.*;
import com.mo2ver.web.domain.goods.domain.Discount;
import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.domain.GoodsImage;
import com.mo2ver.web.domain.goods.domain.Price;
import com.mo2ver.web.domain.goods.dto.CategoryPageDto;
import com.mo2ver.web.domain.goods.dto.GoodsDto;
import com.mo2ver.web.domain.goods.dto.GoodsImageDto;
import com.mo2ver.web.domain.goods.dto.GoodsSearchDto;
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
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GoodsService {

    private static final String GOODS_DIRECTORY = "goods";

    @Autowired
    protected GoodsRepository goodsRepository;
    @Autowired
    protected PriceRepository priceRepository;
    @Autowired
    protected DiscountRepository discountRepository;
    @Autowired
    protected GoodsImageRepository goodsImageRepository;
    @Autowired
    protected FileUtil fileUtil;
    @Autowired
    protected CryptoUtil cryptoUtil;

    @Transactional
    public byte[] findGoodsImage(Integer id) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(GOODS_DIRECTORY);
        Optional<GoodsImage> info = this.goodsImageRepository.findByGoodsImageAttachFile(id);
        if (info.isPresent()) {
            GoodsImage goodsImage = info.get();
            String targetFileName = goodsImage.getGoodsImageAttachFile() + "." + goodsImage.getGoodsImageExtension();
            File targetFile = this.fileUtil.getTargetFile(uploadDirectory, targetFileName);
            return this.cryptoUtil.decryptFile(targetFile.getAbsolutePath());
        } else {
            throw new IOException("해당되는 파일을 찾을 수 없습니다.");
        }
    }

    @Transactional
    public GoodsDto findGoods(String id) {
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
        return this.goodsRepository.findByCategoryCode(pageable, categoryCode, categoryType);
    }

    @Transactional
    public List<GoodsDto> findGoodslistRank(Integer count) {
        List<Goods> goods = this.goodsRepository.findByGoodsRank(count);
        return goods.stream().map(GoodsDto::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public Page<GoodsDto> findGoodsSearch(Pageable pageable, GoodsSearchDto goodsSearchDto) {
        Page<Goods> goods = this.goodsRepository.findByGoodsName(pageable, goodsSearchDto);
        return goods.map(GoodsDto::toDTO);
    }

    @Transactional
    public void saveImageGoods(List<MultipartFile> files, GoodsImageDto goodsImageDto, Member currentUser) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(GOODS_DIRECTORY);
        Price price = this.priceRepository.save(Price.of(goodsImageDto, currentUser));
        if (goodsImageDto.getSalePeriodYesNo() == 'Y') this.discountRepository.save(Discount.of(price.getGoodsCode(), goodsImageDto, currentUser));
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = this.fileUtil.getFileExtension(Objects.requireNonNull(fileName));
            Integer goodsImageAttachFile = getGoodsImageAttachFile(price.getGoodsCode().getGoodsCode(), i+1);
            Character basicImageYesNo = getBasicImageYesNo(i);
            File targetFile = this.fileUtil.getTargetFile(uploadDirectory, goodsImageAttachFile + "." + fileExtension);
            this.cryptoUtil.encryptFile(file, targetFile);  // 파일 저장
            this.goodsImageRepository.save(GoodsImage.of(price.getGoodsCode(), goodsImageAttachFile, basicImageYesNo, fileExtension, i+1, currentUser));
        }
    }

    private Integer getGoodsImageAttachFile(String goodsCode, Integer index) {
        return (Integer.parseInt(goodsCode) - 1000000000) * 100 + index;
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
