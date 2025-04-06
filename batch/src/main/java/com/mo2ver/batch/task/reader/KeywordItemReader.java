package com.mo2ver.batch.task.reader;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class KeywordItemReader extends BaseItemReader<String> {

    private final GoodsRepository goodsRepository;

    @Override
    protected List<String> loadItems() {
        return goodsRepository.findAllGoodeCodeByKeywordIsNull();
    }
}
