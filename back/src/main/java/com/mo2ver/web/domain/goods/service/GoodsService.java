package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.goods.entity.*;
import com.mo2ver.web.domain.goods.repository.*;
import com.mo2ver.web.domain.goods.dto.request.CategoryPageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.mo2ver.web.domain.goods.dto.response.GoodsDetailResponse;
import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.goods.type.CategoryType;
import com.mo2ver.web.domain.goods.type.OptionsType;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsService {

    private static final String GOODS_DIRECTORY = "goods";

    private final FileService fileService;
    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final PriceRepository priceRepository;
    private final OptionsRepository optionsRepository;
    private final DiscountRepository discountRepository;
    private final GoodsImageRepository goodsImageRepository;

    @Transactional
    public GoodsDetailResponse findGoods(String id) {
        Goods goods = this.findGoodsById(id);
        goods.update(); // 조회수 증가
        //return GoodsDetailResponse.of(goods);
        return this.findByGoodsCode(id);
    }

    @Transactional
    public Page<GoodsResponse> findGoodslist(Pageable pageable, CategoryPageRequest categoryPageRequest) {
        //Page<Goods> goods = useJpaRepository(pageable, categoryPageRequest.getCategoryCode(), categoryPageRequest.getCategoryType());
        Page<Goods> goods = useQueryDsl(pageable, categoryPageRequest.getCategoryCode(), categoryPageRequest.getCategoryType());
        return goods.map(GoodsResponse::of);
    }

    // @EntityGraph → 복잡한 연관 관계일수록 속도가 느려짐... → QueryDSL 구성 요소인 QuerydslRepositorySupport으로 해결함
    private Page<Goods> useJpaRepository(Pageable pageable, String categoryCode, CategoryType categoryType) {
        switch(categoryType) {
            case LARGE:
                return this.goodsRepository.findByLargeCategoryCode(pageable, categoryCode);
            case MEDIUM:
                return this.goodsRepository.findByMediumCategoryCode(pageable, categoryCode);
            case SMALL:
                return this.goodsRepository.findBySmallCategoryCode(pageable, categoryCode);
            default:
                return this.goodsRepository.findAll(pageable);
        }
    }

    private Page<Goods> useQueryDsl(Pageable pageable, String categoryCode, CategoryType categoryType) {
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
    public String saveImageGoods(GoodsImageAttachRequest goodsImageAttachRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Options options = this.findOptionsByMember(member);
        Goods goods = new Goods(goodsImageAttachRequest, options, member);
        return this.goodsRepository.save(goods).getGoodsCode();
    }

    @Transactional
    public void updateImageGoods(GoodsImageAttachRequest goodsImageAttachRequest, Member currentUser) {
        Goods goods = this.findGoodsById(goodsImageAttachRequest.getGoodsCode());
        Member member = this.findMemberById(currentUser.getMemberNo());
        Options options = this.findOptionsByMember(member);
        goods.update(goodsImageAttachRequest, options, member);
        this.goodsRepository.save(goods);
    }

    @Transactional
    public String saveImageGoods(List<MultipartFile> files, GoodsImageRequest goodsImageRequest, Member currentUser) throws Exception {
        Goods goods = this.findGoodsById(goodsImageRequest.getGoodsCode());
        Member member = this.findMemberById(currentUser.getMemberNo());
        Options options = this.findOptionsByMember(member);
        Price price = this.priceRepository.save(Price.of(goods, options, goodsImageRequest, currentUser));
        if ('Y' == goodsImageRequest.getSalePeriodYesNo()) this.discountRepository.save(Discount.of(price.getGoods(), goodsImageRequest, currentUser));
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            Character basicImageYesNo = getBasicImageYesNo(i);
            FileInfo fileInfo = this.fileService.saveFile(file, GOODS_DIRECTORY, currentUser);
            this.goodsImageRepository.save(GoodsImage.of(price.getGoods(), fileInfo.getFileCode(), basicImageYesNo, fileInfo.getFileExtension(), i+1, currentUser));
        }
        return price.getGoods().getGoodsCode();
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Goods findGoodsById(String goodsCode) {
        return this.goodsRepository.findById(goodsCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private Options findOptionsByMember(Member member) {
        return this.optionsRepository.findByMemberAndOptionsType(member, OptionsType.BASIC)
                .orElseGet(() -> optionsRepository.save(Options.of(member)));
    }

    private GoodsDetailResponse findByGoodsCode(String goodsCode) {
        return this.goodsRepository.findGoodsById(goodsCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
