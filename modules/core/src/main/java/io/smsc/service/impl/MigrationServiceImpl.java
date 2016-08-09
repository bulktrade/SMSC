package io.smsc.service.impl;

import io.smsc.dao.MigrationDao;
import io.smsc.service.MigrationService;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.SQLException;

@Component
public class MigrationServiceImpl implements MigrationService {
	private static Logger log = Logger.getLogger(MigrationServiceImpl.class);

	@Autowired
	private MigrationDao migrationDao;

	@Value("classpath:db/migration/*.sql")
	Resource[] resources;

	public void upgradeDatabase() {
		for (Resource resource : resources) {
			try {
				log.info("Start migration for " + resource.getFilename());
				log.debug("SQL: " + IOUtils.toString(resource.getInputStream()));

				migrationDao.upgradeDatabase(IOUtils.toString(resource.getInputStream()));

				log.info("Migration is done for " + resource.getFilename());
			} catch (IOException e) {
				log.error(e);
			} catch (SQLException ex) {
				log.error("SQL Exception!");

				for (Throwable e : ex) {
					if (e instanceof SQLException) {
						log.error("SQLState: " + ((SQLException) e).getSQLState());
						log.error("Error Code: " + ((SQLException) e).getErrorCode());
						log.error("Message: " + e.getMessage());

						Throwable t = ex.getCause();
						while (t != null) {
							log.error("Cause: " + t);
							t = t.getCause();
						}
					}
				}
			}
		}
	}
}
