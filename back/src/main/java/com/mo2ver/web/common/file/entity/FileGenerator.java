package com.mo2ver.web.common.file.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class FileGenerator implements IdentifierGenerator {

    private final static Long FIRST_FILE_NO = 100000L;

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT COALESCE(MAX(FILE_CD), 0) FROM CMM_FILE";
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                Long lastFileNo = rs.getLong(1);
                return generateNextId(lastFileNo);
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

        return FIRST_FILE_NO;
    }

    private Long generateNextId(Long lastGoodsNo) {
        if(lastGoodsNo <= FIRST_FILE_NO) {
            return FIRST_FILE_NO + 1;
        }
        return lastGoodsNo + 1;
    }
}
