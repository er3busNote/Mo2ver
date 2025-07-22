package com.mo2ver.web.domain.member.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TermsGenerator implements IdentifierGenerator {

    private final static String FIRST_TERMS_NO = "TM00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(TERMS_NO) FROM TERMS";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastTermsNo = rs.getString(1);
                if (lastTermsNo != null) {
                    return generateNextId(lastTermsNo);
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

        return FIRST_TERMS_NO;
    }

    private String generateNextId(String lastTermsNo) {
        Integer nextId = Integer.parseInt(lastTermsNo.substring(2)) + 1;
        return "TM" + String.format("%08d", nextId);
    }
}
