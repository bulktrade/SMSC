package io.smsc.listener;

import io.smsc.orientdb.Server;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * Created by deacix on 31.01.16.
 */
@Component
public class EmbeddedOrientDBListener {
	Server server;

	@EventListener({ContextRefreshedEvent.class})
	public void onApplicationEvent(ContextRefreshedEvent contextEvent) throws Exception {
		if (System.getenv("EMBEDDED_ORIENTDB_ENABLED") != null && System.getenv("EMBEDDED_ORIENTDB_ENABLED").equals("1")) {
		    server = Server.start();
		}
	}


	@EventListener({ContextClosedEvent.class})
	public void onApplicationEvent(ContextClosedEvent contextEvent) {
		if (System.getenv("EMBEDDED_ORIENTDB_ENABLED") != null && System.getenv("EMBEDDED_ORIENTDB_ENABLED").equals("1")) {
            server.getInstance().shutdown();
        }
	}
}