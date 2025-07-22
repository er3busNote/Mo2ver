package com.mo2ver.web.domain.payment.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PaymentGenerator implements IdentifierGenerator {

    private final static String FIRST_PAYMENT_NO = "PY00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(PAY_CD) FROM PAY";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastPaymentCd = rs.getString(1);
                if (lastPaymentCd != null) {
                    return generateNextId(lastPaymentCd);
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

        return FIRST_PAYMENT_NO;
    }

    private String generateNextId(String lastPaymentNo) {
        Integer nextId = Integer.parseInt(lastPaymentNo.substring(2)) + 1;
        return "PY" + String.format("%08d", nextId);
    }
}
