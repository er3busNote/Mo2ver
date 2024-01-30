package com.mo2ver.web.domain.goods.domain;

import com.mo2ver.web.domain.member.domain.Member;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GoodsGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Connection connection = null;
        String query = "SELECT MAX(GD_CD) FROM GD";
        String lastMemberNo = null;
        Member newMember = (Member) obj;
        try {
            connection = session.getJdbcConnectionAccess().obtainConnection();
            PreparedStatement statement = connection.prepareStatement(query);

            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                lastMemberNo = rs.getString(1);
                if (lastMemberNo != null) {
                    String memberNo = generateNextId(lastMemberNo);
                    newMember.setRegister(memberNo);
                    newMember.setUpdater(memberNo);
                    return memberNo;
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

        newMember.setRegister("1000000001");
        newMember.setUpdater("1000000001");
        return "1000000001";
    }

    private String generateNextId(String lastMemberNo) {
        Integer nextId = Integer.parseInt(lastMemberNo.substring(1)) + 1;
        return String.valueOf(1000000000 + nextId);
    }
}
