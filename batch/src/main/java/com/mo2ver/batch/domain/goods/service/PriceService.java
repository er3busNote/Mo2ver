package com.mo2ver.batch.domain.goods.service;

import com.mo2ver.batch.domain.goods.repository.PriceRepository;
import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PriceService {

    @Autowired
    PriceRepository priceRepository;

    @Transactional
    public void updatePriceApplyDateForGoodsCode(List<Goods> listGoods) {
        this.priceRepository.updateApplyDatesForGoodsCodes(listGoods);
    }
}
