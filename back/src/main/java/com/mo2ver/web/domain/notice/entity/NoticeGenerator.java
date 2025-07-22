package com.mo2ver.web.domain.notice.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class NoticeGenerator implements IdentifierGenerator {

    private final static String FIRST_NOTICE_NO = "NT00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(NTC_NO) FROM NTC";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastNoticeNo = rs.getString(1);
                if (lastNoticeNo != null) {
                    return generateNextId(lastNoticeNo);
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

        return FIRST_NOTICE_NO;
    }

    private String generateNextId(String lastNoticeNo) {
        Integer nextId = Integer.parseInt(lastNoticeNo.substring(2)) + 1;
        return "NT" + String.format("%08d", nextId);
    }
}
