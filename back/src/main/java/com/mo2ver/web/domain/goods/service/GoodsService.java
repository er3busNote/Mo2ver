package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.domain.goods.dao.*;
import com.mo2ver.web.domain.goods.domain.Discount;
import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.domain.Image;
import com.mo2ver.web.domain.goods.domain.Price;
import com.mo2ver.web.domain.goods.dto.CategoryPageDto;
import com.mo2ver.web.domain.goods.dto.GoodsDto;
import com.mo2ver.web.domain.goods.dto.GoodsImageDto;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.properties.ImagesProperties;
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
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class GoodsService {

    @Autowired
    protected GoodsRepository goodsRepository;
    @Autowired
    protected PriceRepository priceRepository;
    @Autowired
    protected DiscountRepository discountRepository;
    @Autowired
    protected ImageRepository imageRepository;
    @Autowired
    protected GoodsRepositoryImpl goodsCustomRepository;
    @Autowired
    protected ImagesProperties imagesProperties;

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

    @Transactional
    public void saveImageGoods(List<MultipartFile> files, GoodsImageDto goodsImageDto, Member currentUser) throws IOException {
        Path folderPath = Paths.get(imagesProperties.getFilepath());
        Path uploadDirectory = folderPath.resolve("goods");
        this.createDirectory(uploadDirectory.toString()); // 업로드할 디렉토리가 없으면 생성

        Price price = this.priceRepository.save(Price.of(goodsImageDto, currentUser));
        if (goodsImageDto.getSalePeriodYesNo() == 'Y') this.discountRepository.save(Discount.of(price.getGoodsCode(), goodsImageDto, currentUser));
        for (int i = 0; i< files.size(); i++) {
            MultipartFile file = files.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(Objects.requireNonNull(fileName));
            Integer goodsImageAttachFile = getGoodsImageAttachFile(price.getGoodsCode().getGoodsCode(), i+1);
            Character basicImageYesNo = getBasicImageYesNo(i);
            File targetFile = new File(uploadDirectory + "/" + goodsImageAttachFile + "." + fileExtension);
            file.transferTo(targetFile); // 파일 저장
            this.imageRepository.save(Image.of(price.getGoodsCode(), goodsImageAttachFile, basicImageYesNo, fileExtension, i+1, currentUser));
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

    private Integer getGoodsImageAttachFile(String goodsCode, Integer index) {
        return (Integer.parseInt(goodsCode) - 1000000000) * 100 + index;
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
