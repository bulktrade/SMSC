package io.smsc.dao.impl;

import com.orientechnologies.orient.core.command.script.OCommandScript;
import com.orientechnologies.orient.core.db.document.ODatabaseDocumentTx;
import io.smsc.dao.MigrationDao;
import io.smsc.service.OrientDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MigrationDaoImpl implements MigrationDao {
	@Autowired
	private OrientDBService orientDBService;

	public void upgradeDatabase(String sql) throws Exception {
		ODatabaseDocumentTx db = orientDBService.getDocumentConnection();
		db.command(new OCommandScript("sql", sql)).execute();
	}
}
