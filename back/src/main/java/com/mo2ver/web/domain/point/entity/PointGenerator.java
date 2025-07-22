package com.mo2ver.web.domain.point.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PointGenerator implements IdentifierGenerator {

    private final static String FIRST_POINT_NO = "PT00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(PNT_NO) FROM PNT";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastPointNo = rs.getString(1);
                if (lastPointNo != null) {
                    return generateNextId(lastPointNo);
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

        return FIRST_POINT_NO;
    }

    private String generateNextId(String lastPointNo) {
        Integer nextId = Integer.parseInt(lastPointNo.substring(2)) + 1;
        return "PT" + String.format("%08d", nextId);
    }
}
