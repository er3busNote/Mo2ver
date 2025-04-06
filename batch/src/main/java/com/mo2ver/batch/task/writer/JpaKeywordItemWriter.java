package com.mo2ver.batch.task.writer;

import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;

@Component
public class JpaKeywordItemWriter extends JpaItemWriter<Goods> {

    public JpaKeywordItemWriter(EntityManagerFactory entityManagerFactory) {
        super.setEntityManagerFactory(entityManagerFactory);
    }
}
