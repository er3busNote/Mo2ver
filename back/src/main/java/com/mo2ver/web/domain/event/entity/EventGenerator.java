package com.mo2ver.web.domain.event.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class EventGenerator  implements IdentifierGenerator {

    private final static String FIRST_EVENT_NO = "EV00000001";

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(EVT_NO) FROM EVT";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                String lastEventNo = rs.getString(1);
                if (lastEventNo != null) {
                    return generateNextId(lastEventNo);
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

        return FIRST_EVENT_NO;
    }

    private String generateNextId(String lastEventNo) {
        Integer nextId = Integer.parseInt(lastEventNo.substring(2)) + 1;
        return "EV" + String.format("%08d", nextId);
    }
}
