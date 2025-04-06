package com.mo2ver.batch.task.reader;

import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;

@Component
public class JpaKeywordItemReader extends JpaPagingItemReader<Goods> {

    public JpaKeywordItemReader(EntityManagerFactory entityManagerFactory) {
        super.setName("goodsKeywordPagingReader");
        super.setQueryString("SELECT g FROM Goods g WHERE g.keyword IS NULL ORDER BY g.goodsCode ASC");
        super.setEntityManagerFactory(entityManagerFactory);
        super.setPageSize(100);
        super.setSaveState(true);
    }

    // 참고 (Spring Batch Paging Reader 사용시 같은 조건의 데이터를 읽고 수정할때 문제) : https://jojoldu.tistory.com/337
    @Override
    public int getPage() {
        return 0; // 항상 첫 번째 페이지만 읽도록 고정
    }
}
