package com.mo2ver.batch.task.processor;

import com.mo2ver.batch.common.utils.RandomKeywordUtil;
import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Component
@RequiredArgsConstructor
public class KeywordItemProcessor implements ItemProcessor<String, Goods> {

    private final GoodsRepository goodsRepository;

    @Override
    public Goods process(String goodsCode) {
        Goods goods = this.goodsRepository.findByGoodsCode(goodsCode);
        try {
            int count = ThreadLocalRandom.current().nextInt(5, 11); // 5~10
            String keywords = RandomKeywordUtil.getRandomKeywords(count);
            goods.setKeyword(keywords);
            return goods;
        } catch (Exception e) {
            log.error("Processor error - {}: {}", goods.getGoodsCode(), e.getMessage(), e);
            return null;
        }
    }
}
