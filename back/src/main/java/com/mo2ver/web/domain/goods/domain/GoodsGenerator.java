package com.mo2ver.web.domain.goods.domain;

import com.mo2ver.web.domain.goods.domain.Goods;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GoodsGenerator implements IdentifierGenerator {

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

        newGoods.setRegister("1000000001");
        newGoods.setUpdater("1000000001");
        return "1000000001";
    }

    private String generateNextId(String lastGoodsNo) {
        Integer nextId = Integer.parseInt(lastGoodsNo.substring(1)) + 1;
        return String.valueOf(1000000000 + nextId);
    }
}
