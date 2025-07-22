package com.mo2ver.web.domain.coupon.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CouponGenerator implements IdentifierGenerator {

    private final static String FIRST_COUPON_NO = "CP00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(CPN_NO) FROM CPN";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastCouponNo = rs.getString(1);
                if (lastCouponNo != null) {
                    return generateNextId(lastCouponNo);
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

        return FIRST_COUPON_NO;
    }

    private String generateNextId(String lastCouponNo) {
        Integer nextId = Integer.parseInt(lastCouponNo.substring(2)) + 1;
        return "CP" + String.format("%08d", nextId);
    }
}
