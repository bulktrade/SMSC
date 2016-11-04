package io.smsc.listener;

import io.smsc.service.MigrationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class MigrationListener implements ApplicationListener<ApplicationReadyEvent>, Ordered {
	private static Logger log = Logger.getLogger(MigrationListener.class);

	@Autowired
	private MigrationService migrationService;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent contextEvent) {
		log.info("Start migration!");
		migrationService.upgradeDatabase();
		log.info("Migration finish!");
	}

	@Override
	public int getOrder() {
		return 0;
	}
}