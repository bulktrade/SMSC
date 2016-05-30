package io.smsc.listener;

import io.smsc.orientdb.Server;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class EmbeddedOrientDBListener implements ApplicationListener<ContextRefreshedEvent>, Ordered {
	Server server;

	@EventListener({ContextRefreshedEvent.class})
	public void onApplicationEvent(ContextRefreshedEvent contextEvent) {
		if (System.getenv("EMBEDDED_ORIENTDB_ENABLED") != null && System.getenv("EMBEDDED_ORIENTDB_ENABLED").equals("1")) {
			try {
				server = Server.start();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}


	@EventListener({ContextClosedEvent.class})
	public void onApplicationEvent(ContextClosedEvent contextEvent) {
		if (System.getenv("EMBEDDED_ORIENTDB_ENABLED") != null && System.getenv("EMBEDDED_ORIENTDB_ENABLED").equals("1")) {
            server.getInstance().shutdown();
        }
	}

	@Override
	public int getOrder() {
		return HIGHEST_PRECEDENCE;
	}
}