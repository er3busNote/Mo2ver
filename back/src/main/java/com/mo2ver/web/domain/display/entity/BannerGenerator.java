package com.mo2ver.web.domain.display.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BannerGenerator implements IdentifierGenerator {

    private final static String FIRST_BANNER_NO = "BN00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(BNNR_NO) FROM DP_BNNR";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastBannerNo = rs.getString(1);
                if (lastBannerNo != null) {
                    return generateNextId(lastBannerNo);
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

        return FIRST_BANNER_NO;
    }

    private String generateNextId(String lastBannerNo) {
        Integer nextId = Integer.parseInt(lastBannerNo.substring(2)) + 1;
        return "BN" + String.format("%08d", nextId);
    }
}
