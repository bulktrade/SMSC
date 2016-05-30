package io.smsc.dao.impl;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import io.smsc.dao.MigrationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.sql.Statement;

@Component
public class MigrationDaoImpl implements MigrationDao {
    @Autowired
    private OrientJdbcConnection orientDBConnection;

    public void upgradeDatabase(String sql) throws SQLException {
        Statement stmt = orientDBConnection.createStatement();
        stmt.execute(sql);
    }
}
