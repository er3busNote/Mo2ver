package com.mo2ver.web.domain.delivery.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DeliveryGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(DLV_CD) FROM DLV";
        String lastDeliveryNo = null;
        Delivery newDelivery = (Delivery) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastDeliveryNo = rs.getString(1);
                if (lastDeliveryNo != null) {
                    String memberNo = generateNextId(lastDeliveryNo);
                    newDelivery.setRegister(memberNo);
                    newDelivery.setUpdater(memberNo);
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

        newDelivery.setRegister("D000000001");
        newDelivery.setUpdater("D000000001");
        return "D000000001";
    }

    private String generateNextId(String lastDeliveryNo) {
        Integer nextId = Integer.parseInt(lastDeliveryNo.substring(1)) + 1;
        return 'D' + String.format("%09d", nextId);
    }
}
