package io.smsc.service.impl;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import io.smsc.service.OrientDBService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

@Component
@PropertySource("classpath:orientdb.properties")
public class OrientDBServiceImpl implements OrientDBService {
	private static Logger log = Logger.getLogger(MigrationServiceImpl.class);
	private static OrientJdbcConnection connection = null;

	@Value("${orientdb.username}")
	private String username;

	@Value("${orientdb.password}")
	private String password;

	@Value("${orientdb.hostname}")
	private String hostname;

	@Value("${orientdb.database}")
	private String database;

	@Value("${orientdb.usePool}")
	private String usePool;

	@Value("${orientdb.pool.min}")
	private String poolMin;

	@Value("${orientdb.pool.max}")
	private String poolMax;

	public synchronized OrientJdbcConnection getJdbcConnection() throws SQLException {
		if (connection == null) {
			Properties info = new Properties();
			info.put("user", username);
			info.put("password", password);

			info.put("db.usePool", usePool); // USE THE POOL
			info.put("db.pool.min", poolMin);   // MINIMUM POOL SIZE
			info.put("db.pool.max", poolMax);  // MAXIMUM POOL SIZE

			connection = (OrientJdbcConnection) DriverManager.getConnection("jdbc:orient:remote:" + hostname + "/" + database, info);
			log.info("Connected to OrientDB over JDBC.");
		}

		return connection;
	}
}
