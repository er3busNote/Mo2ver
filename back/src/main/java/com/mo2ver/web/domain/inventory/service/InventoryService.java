package com.mo2ver.web.domain.inventory.service;

import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryService {

    private final GoodsRepository goodsRepository;

    public void validate() {

    }

    public void validate(String orderId) {

    }

    public void update(String orderId) {

    }

    public void rollback(String orderId) {

    }
}
