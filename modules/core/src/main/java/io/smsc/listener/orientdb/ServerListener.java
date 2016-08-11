package io.smsc.listener.orientdb;

import io.smsc.orientdb.Server;
import org.apache.log4j.Logger;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class ServerListener implements ApplicationListener<ApplicationReadyEvent>, Ordered {
	private static Logger log = Logger.getLogger(ServerListener.class);

	Server server;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent contextEvent) {
		log.info("Start OrientDB.");

		if (System.getenv("EMBEDDED_ORIENTDB_ENABLED") != null && System.getenv("EMBEDDED_ORIENTDB_ENABLED").equals("1")) {
			try {
				server = Server.start();

				Runtime.getRuntime().addShutdownHook(new Thread() {
					@Override
					public void run() {
						log.info("Stop OrientDB.");
						server.getInstance().shutdown();
					}
				});
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public int getOrder() {
		return HIGHEST_PRECEDENCE;
	}
}