package io.smsc.dao.impl;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import io.smsc.dao.MigrationDao;
import io.smsc.service.OrientDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.sql.Statement;

@Component
public class MigrationDaoImpl implements MigrationDao {
	@Autowired
	private OrientDBService orientDBService;

	public void upgradeDatabase(String sql) throws SQLException {
		OrientJdbcConnection connection = orientDBService.getJdbcConnection();
		Statement stmt = connection.createStatement();

		connection.setAutoCommit(false);

		stmt.addBatch(sql);
		stmt.executeBatch();

		connection.commit();
	}
}
