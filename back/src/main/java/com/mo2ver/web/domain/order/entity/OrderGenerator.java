package com.mo2ver.web.domain.order.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderGenerator implements IdentifierGenerator {

    private final static String FIRST_ORDER_NO = "OD00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(ODR_CD) FROM ODR";
        String lastOrderCd = null;
        Order newOrder = (Order) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastOrderCd = rs.getString(1);
                if (lastOrderCd != null) {
                    return generateNextId(lastOrderCd);
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

        return FIRST_ORDER_NO;
    }

    private String generateNextId(String lastOrderNo) {
        Integer nextId = Integer.parseInt(lastOrderNo.substring(2)) + 1;
        return "OD" + String.format("%08d", nextId);
    }
}
