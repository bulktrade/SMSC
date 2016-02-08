package io.smsc.orientdb;

import com.orientechnologies.orient.core.config.OGlobalConfiguration;
import com.orientechnologies.orient.server.OServer;
import com.orientechnologies.orient.server.OServerMain;
import com.orientechnologies.orient.server.config.*;
import com.orientechnologies.orient.server.network.protocol.binary.ONetworkProtocolBinary;
import com.orientechnologies.orient.server.network.protocol.http.ONetworkProtocolHttpDb;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by deacix on 31.01.16.
 */
public class Server {
	/**
	 * OrientDB Embedded Server Instance.
	 */
	private OServer instance;

	protected static final String STORAGE_PLOCAL = "plocal";
	protected static final String STORAGE_MEMORY = "memory";
	protected static final String STORAGE_REMOTE = "remote";

	private String defaultRootPassword = "admin";
	private String defaultDatabase = "smsc";
	private String defaultUserName = "smsc";
	private String defaultPassword = "smscPassword$";
	private String defaultStorage = STORAGE_MEMORY;
	private String defaultOAuth2Key = null;

	public OServer getInstance() {
		return instance;
	}
	private void setInstance(OServer instance) {
		this.instance = instance;
	}

	public String getDefaultDatabase() {
		return defaultDatabase;
	}

	public String getDefaultUserName() {
		return defaultUserName;
	}

	public String getDefaultPassword() {
		return defaultPassword;
	}

	public String getDefaultPath() {
		return defaultStorage + ":";
	}

	public String getDefaultOAuth2Key() {
		return defaultOAuth2Key;
	}

	public String getDefaultStorage() {
		return defaultStorage;
	}

	public void run() throws Exception {
		setInstance(OServerMain.create());
		OServerConfiguration cfg = new OServerConfiguration();

		OServerStorageConfiguration storage = new OServerStorageConfiguration();
		storage.name = System.getenv("ORIENTDB_DATABASE") != null ? System.getenv("ORIENTDB_DATABASE") : getDefaultDatabase();
		storage.userName = System.getenv("ORIENTDB_DATABASE_USERNAME") != null ? System.getenv("ORIENTDB_DATABASE_USERNAME") : getDefaultUserName();
		storage.userPassword = System.getenv("ORIENTDB_DATABASE_PASSWORD") != null ? System.getenv("ORIENTDB_DATABASE_PASSWORD") : getDefaultPassword();
		storage.loadOnStartup = true;
		storage.path = System.getenv("ORIENTDB_PATH") != null ? System.getenv("ORIENTDB_PATH") : getDefaultPath() + storage.name;

		cfg.storages = new OServerStorageConfiguration[]{
			storage
		};

		cfg.properties = new OServerEntryConfiguration[]{
			new OServerEntryConfiguration("cache.size", System.getenv("ORIENTDB_CACHE_SIZE") != null ? System.getenv("ORIENTDB_CACHE_SIZE") : "10000"),
			new OServerEntryConfiguration("log.console.level", System.getenv("ORIENTDB_LOG_CONSOLE_LEVEL") != null ? System.getenv("ORIENTDB_LOG_CONSOLE_LEVEL") : "info"),
			new OServerEntryConfiguration("log.file.level", System.getenv("ORIENTDB_LOG_FILE_LEVEL") != null ? System.getenv("ORIENTDB_LOG_FILE_LEVEL") : "fine"),
			new OServerEntryConfiguration("profiler.enabled", System.getenv("ORIENTDB_PROFILER_ENABLED") != null ? System.getenv("ORIENTDB_PROFILER_ENABLED") : "true"),
			new OServerEntryConfiguration("profiler.config", System.getenv("ORIENTDB_PROFILER_CONFIG") != null ? System.getenv("ORIENTDB_PROFILER_CONFIG") : "30,10,10"),
			new OServerEntryConfiguration("db.pool.min", System.getenv("ORIENTDB_POOL_MIN") != null ? System.getenv("ORIENTDB_POOL_MIN") : "1"),
			new OServerEntryConfiguration("db.pool.max", System.getenv("ORIENTDB_POOL_MAX") != null ? System.getenv("ORIENTDB_POOL_MAX") : "50")
		};

		if (System.getenv("ORIENTDB_ROOT_PASSWORD") == null) {
			System.setProperty("ORIENTDB_ROOT_PASSWORD", defaultRootPassword);
		}

		cfg.security = new OServerSecurityConfiguration();
		cfg.security.users = Arrays.asList(
			new OServerUserConfiguration(
				OServerConfiguration.SRV_ROOT_ADMIN,
				System.getProperty("ORIENTDB_ROOT_PASSWORD"),
				"*"
			)
		);

		OServerHandlerConfiguration graphHandler = new OServerHandlerConfiguration();
		graphHandler.clazz = "com.orientechnologies.orient.graph.handler.OGraphServerHandler";
		graphHandler.parameters = new OServerParameterConfiguration[] {
			new OServerParameterConfiguration("enabled", System.getenv("ORIENTDB_GRAPH_SERVER") != null ? System.getenv("ORIENTDB_GRAPH_SERVER") : "true"),
			new OServerParameterConfiguration("graph.pool.max", System.getenv("ORIENTDB_GRAPH_POOL_MAX") != null ? System.getenv("ORIENTDB_GRAPH_POOL_MAX") : "50"),
		};

		OServerHandlerConfiguration jmxHandler = new OServerHandlerConfiguration();
		jmxHandler.clazz = "com.orientechnologies.orient.server.handler.OJMXPlugin";
		jmxHandler.parameters = new OServerParameterConfiguration[] {
			new OServerParameterConfiguration("enabled", System.getenv("ORIENTDB_OJMXPLUGIN_ENABLED") != null ? System.getenv("ORIENTDB_OJMXPLUGIN_ENABLED") : "false"),
			new OServerParameterConfiguration("profilerManaged", System.getenv("ORIENTDB_OJMXPLUGIN_PROFILE_MANAGED_ENABLED") != null ? System.getenv("ORIENTDB_OJMXPLUGIN_PROFILE_MANAGED_ENABLED") : "false"),
		};

		OServerHandlerConfiguration serverSideScriptInterpreterHandler = new OServerHandlerConfiguration();
		serverSideScriptInterpreterHandler.clazz = "com.orientechnologies.orient.server.handler.OServerSideScriptInterpreter";
		serverSideScriptInterpreterHandler.parameters = new OServerParameterConfiguration[] {
			new OServerParameterConfiguration("enabled", System.getenv("ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ENABLED") != null ? System.getenv("ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ENABLED") : "true"),
			new OServerParameterConfiguration("allowedLanguages", System.getenv("ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ALLOWED_LANGUAGES") != null ? System.getenv("ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ALLOWED_LANGUAGES") : "SQL,Javascript"),
		};


		OServerHandlerConfiguration liveQueryHandler = new OServerHandlerConfiguration();
		liveQueryHandler.clazz = "com.orientechnologies.orient.server.plugin.livequery.OLiveQueryPlugin";
		liveQueryHandler.parameters = new OServerParameterConfiguration[] {
			new OServerParameterConfiguration("enabled", System.getenv("ORIENTDB_LIVE_QUERY_PLUGIN") != null ? System.getenv("ORIENTDB_LIVE_QUERY_PLUGIN") : "true"),
		};

		cfg.handlers = Arrays.asList(
			graphHandler,
			jmxHandler,
			serverSideScriptInterpreterHandler,
			liveQueryHandler
		);

		cfg.network = new OServerNetworkConfiguration();
		cfg.network.protocols = Arrays.asList(
			new OServerNetworkProtocolConfiguration("binary", ONetworkProtocolBinary.class.getName()),
			new OServerNetworkProtocolConfiguration("http", ONetworkProtocolHttpDb.class.getName())
		);

		OServerNetworkListenerConfiguration binaryListener = new OServerNetworkListenerConfiguration();
		OServerNetworkListenerConfiguration httpListener = new OServerNetworkListenerConfiguration();
		httpListener.protocol = "http";
		httpListener.portRange = "2480-2490";
		httpListener.parameters = new OServerParameterConfiguration[] {
			new OServerParameterConfiguration("network.http.charset", "utf-8"),
			new OServerParameterConfiguration("network.http.jsonResponseError", "true"),
			new OServerParameterConfiguration("network.http.additionalResponseHeaders", "Access-Control-Allow-Origin:*;Access-Control-Allow-Credentials: true"),
		};

		OServerCommandConfiguration httpListenerCommand = new OServerCommandConfiguration();
		httpListenerCommand.pattern = "GET|www GET|studio/ GET| GET|*.htm GET|*.html GET|*.xml GET|*.jpeg GET|*.jpg GET|*.png GET|*.gif GET|*.js GET|*.css GET|*.swf GET|*.ico GET|*.txt GET|*.otf GET|*.pjs GET|*.svg GET|*.json GET|*.woff GET|*.woff2 GET|*.ttf GET|*.svgz";
		httpListenerCommand.implementation = "com.orientechnologies.orient.server.network.protocol.http.command.get.OServerCommandGetStaticContent";
		httpListenerCommand.parameters = new OServerEntryConfiguration[] {
			new OServerEntryConfiguration("http.cache:*.htm *.html", "Cache-Control: no-cache, no-store, max-age=0, must-revalidate\r\nPragma: no-cache"),
			new OServerEntryConfiguration("http.cache:default", "Cache-Control: max-age=120"),
		};


		OServerCommandConfiguration httpListenerCommand2 = new OServerCommandConfiguration();
		httpListenerCommand2.pattern = "GET|gephi/*";
		httpListenerCommand2.implementation = "com.orientechnologies.orient.graph.server.command.OServerCommandGetGephi";

		httpListener.commands = new OServerCommandConfiguration[] {
			httpListenerCommand,
			httpListenerCommand2
		};

		cfg.network.listeners = Arrays.asList(
			binaryListener,
			httpListener
		);

		cfg.network.sockets = new ArrayList<>();

		if (System.getenv("ORIENTDB_BINARY_SSL_ENABLED") != null) {
			OServerNetworkListenerConfiguration binarySSLListener = new OServerNetworkListenerConfiguration();
			binarySSLListener.socket = "ssl";
			binaryListener.portRange = "2434-2440";

			cfg.network.listeners.add(binarySSLListener);

			OServerSocketFactoryConfiguration sslBinarySocket = new OServerSocketFactoryConfiguration();
			sslBinarySocket.name = "ssl";
			sslBinarySocket.implementation = "com.orientechnologies.orient.server.network.OServerSSLSocketFactory";
			sslBinarySocket.parameters = new OServerParameterConfiguration[] {
				new OServerParameterConfiguration("network.ssl.clientAuth", System.getenv("ORIENTDB_BINARY_SSL_CLIENT_AUTH") != null ? System.getenv("ORIENTDB_BINARY_SSL_CLIENT_AUTH") : "true"),
				new OServerParameterConfiguration("network.ssl.keyStore", System.getenv("ORIENTDB_BINARY_SSL_KEY_STORE") != null ? System.getenv("ORIENTDB_BINARY_SSL_KEY_STORE") : "config/cert/orientdb.ks"),
				new OServerParameterConfiguration("network.ssl.keyStorePassword", System.getenv("ORIENTDB_BINARY_SSL_KEY_STORE_PASSWORD") != null ? System.getenv("ORIENTDB_BINARY_SSL_KEY_STORE_PASSWORD") : "123password"),
				new OServerParameterConfiguration("network.ssl.trustStore", System.getenv("ORIENTDB_BINARY_SSL_TRUST_STORE") != null ? System.getenv("ORIENTDB_BINARY_SSL_TRUST_STORE") : "config/cert/orientdb.ks"),
				new OServerParameterConfiguration("network.ssl.trustStorePassword", System.getenv("ORIENTDB_BINARY_SSL_TRUST_STORE_PASSWORD") != null ? System.getenv("ORIENTDB_BINARY_SSL_TRUST_STORE_PASSWORD") : "123password"),
			};

			cfg.network.sockets.add(sslBinarySocket);
		}

		instance
			.startup(cfg)
			.activate();
	}

	/**
	 * Starts OrientDB Server with config.
	 *
	 * @return Server
	 * @throws Exception
	 */
	public static Server start() throws Exception {
		Server server = new Server();
		server.run();

		return server;
	}
}
