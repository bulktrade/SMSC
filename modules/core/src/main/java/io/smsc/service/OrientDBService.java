package io.smsc.service;

import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import com.orientechnologies.orient.jdbc.OrientJdbcConnection;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public interface OrientDBService {
	OrientJdbcConnection getJdbcConnection() throws Exception;
	ODatabaseDocumentTx getDocumentConnection() throws Exception;
}
