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

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(ODR_CD) FROM ODR";
        String lastOrderNo = null;
        Order newOrder = (Order) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastOrderNo = rs.getString(1);
                if (lastOrderNo != null) {
                    String memberNo = generateNextId(lastOrderNo);
                    newOrder.setRegister(memberNo);
                    newOrder.setUpdater(memberNo);
                    return memberNo;
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

        newOrder.setRegister("O000000001");
        newOrder.setUpdater("O000000001");
        return "O000000001";
    }

    private String generateNextId(String lastOrderNo) {
        Integer nextId = Integer.parseInt(lastOrderNo.substring(1)) + 1;
        return 'O' + String.format("%09d", nextId);
    }
}
