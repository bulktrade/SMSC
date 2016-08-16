package io.smsc.service.impl;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import io.smsc.service.OrientDBService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.sql.DriverManager;
import java.util.Properties;

@Component
@PropertySource("classpath:orientdb.properties")
public class OrientDBServiceImpl implements OrientDBService {
	private static Logger log = Logger.getLogger(MigrationServiceImpl.class);
	private static OrientJdbcConnection jdbcConnection = null;
	private static ODatabaseDocumentTx documentConnection = null;

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

	/**
	 * Connect to OrientDB over JDBC.
	 *
	 * @return
	 * @throws Exception
	 */
	public synchronized OrientJdbcConnection getJdbcConnection() throws Exception {
		if (jdbcConnection == null) {
			Properties info = new Properties();
			info.put("user", username);
			info.put("password", password);

			info.put("db.usePool", usePool); // USE THE POOL
			info.put("db.pool.min", poolMin);   // MINIMUM POOL SIZE
			info.put("db.pool.max", poolMax);  // MAXIMUM POOL SIZE

			jdbcConnection = (OrientJdbcConnection) DriverManager.getConnection("jdbc:orient:remote:" + hostname + "/" + database, info);
			log.info("Connected to OrientDB over JDBC.");
		}

		return jdbcConnection;
	}

	/**
	 * Connect to OrientDB over document connection.
	 *
	 * @return
	 * @throws Exception
	 */
	public synchronized ODatabaseDocumentTx getDocumentConnection() throws Exception {
		if (documentConnection == null) {
			documentConnection = new ODatabaseDocumentTx("remote:" + hostname + "/" + database).open(username, password);
			log.info("Connected to OrientDB over document connection.");
		}

		return documentConnection;
	}
}
