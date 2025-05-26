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

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(PAY_CD) FROM PAY";
        String lastPaymentCd = null;
        Payment newPayment = (Payment) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastPaymentCd = rs.getString(1);
                if (lastPaymentCd != null) {
                    String paymentCd = generateNextId(lastPaymentCd);
                    newPayment.setPaymentCode(paymentCd);
                    return paymentCd;
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

        newPayment.setPaymentCode("P000000001");
        return "P000000001";
    }

    private String generateNextId(String lastPaymentNo) {
        Integer nextId = Integer.parseInt(lastPaymentNo.substring(1)) + 1;
        return 'P' + String.format("%09d", nextId);
    }
}
