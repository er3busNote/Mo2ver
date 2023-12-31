package com.mo2ver.batch.domain.goods.task;

import com.mo2ver.batch.domain.goods.dao.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class GoodsTask {

    @Autowired
    protected GoodsRepository goodsRepository;

    @Transactional
    public void insertGoods() {}
}
