package com.mo2ver.batch.task.reader;

import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;

@Component
public class JpaKeywordItemReader  extends JpaPagingItemReader<Goods> {

    public JpaKeywordItemReader(EntityManagerFactory entityManagerFactory) {
        super.setQueryString("SELECT g FROM Goods g WHERE g.keyword IS NULL");
        super.setEntityManagerFactory(entityManagerFactory);
        super.setPageSize(100);
        super.setSaveState(true);
        super.setName("goodsKeywordPagingReader");
    }
}
