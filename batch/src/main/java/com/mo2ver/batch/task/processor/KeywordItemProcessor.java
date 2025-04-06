package com.mo2ver.batch.task.processor;

import com.mo2ver.batch.common.utils.RandomKeywordUtil;
import com.mo2ver.batch.domain.goods.entity.Goods;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Component
public class KeywordItemProcessor implements ItemProcessor<Goods, Goods> {

    @Override
    public Goods process(Goods goods) {
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
