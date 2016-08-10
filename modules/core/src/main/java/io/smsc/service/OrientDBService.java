package io.smsc.service;

import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public interface OrientDBService {
	OrientJdbcConnection getJdbcConnection() throws SQLException;
}
