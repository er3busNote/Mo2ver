package com.mo2ver.web.domain.goods.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GoodsGenerator implements IdentifierGenerator {

    private final static Long FIRST_GOODS_NO = 1000000000L;

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(GD_CD) FROM GD";
        String lastGoodsNo = null;
        Goods newGoods = (Goods) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastGoodsNo = rs.getString(1);
                if (lastGoodsNo != null) {
                    String goodsNo = generateNextId(lastGoodsNo);
                    newGoods.setRegister(goodsNo);
                    newGoods.setUpdater(goodsNo);
                    return goodsNo;
                }
            }
        } catch (SQLException e) {
            throw new HibernateException("Unable to generate ID", e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    throw new HibernateException("DB Connection Error", e);
                }
            }
        }

        String firstGoodNo = String.valueOf(FIRST_GOODS_NO + 1);
        newGoods.setRegister(firstGoodNo);
        newGoods.setUpdater(firstGoodNo);
        return firstGoodNo;
    }

    private String generateNextId(String lastGoodsNo) {
        Integer nextId = Integer.parseInt(lastGoodsNo.substring(1)) + 1;
        return String.valueOf(FIRST_GOODS_NO + nextId);
    }
}
