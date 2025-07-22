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

    private final static String FIRST_DELIVERY_NO = "DV00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(DLV_CD) FROM DLV";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastDeliveryCd = rs.getString(1);
                if (lastDeliveryCd != null) {
                    return generateNextId(lastDeliveryCd);
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

        return FIRST_DELIVERY_NO;
    }

    private String generateNextId(String lastDeliveryNo) {
        Integer nextId = Integer.parseInt(lastDeliveryNo.substring(2)) + 1;
        return "DV" + String.format("%08d", nextId);
    }
}
