package com.mo2ver.batch.task.writer;

import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KeywordItemWriter extends BaseItemWriter<Goods> {

    private final GoodsRepository goodsRepository;

    @Override
    protected void saveItem(Goods goods) {
        this.goodsRepository.save(goods);
    }
}
