# smsc.io
SMSC Open Source Solution with Monitoring, Billing, SMPP, SS7 and REST API support.


# OrientDB Environment Variables
	
	ORIENTDB_DATABASE = smsc
	ORIENTDB_DATABASE_USERNAME = smsc
	ORIENTDB_DATABASE_PASSWORD = smscPassword$
	ORIENTDB_PATH = memory:smsc
	ORIENTDB_CACHE_SIZE = 10000
	ORIENTDB_ROOT_PASSWORD = admin
	ORIENTDB_GRAPH_SERVER = true
	ORIENTDB_GRAPH_POOL_MAX = 50
	ORIENTDB_OJMXPLUGIN_ENABLED = false
	ORIENTDB_OJMXPLUGIN_PROFILE_MANAGED_ENABLED = true
	ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ENABLED = true
	ORIENTDB_SERVER_SIDE_SCRIPT_INTERPRETER_ALLOWED_LANGUAGES = SQL,Javascript
	ORIENTDB_LIVE_QUERY_PLUGIN = true
	ORIENTDB_LOG_CONSOLE_LEVEL = info
	ORIENTDB_LOG_FILE_LEVEL = fine
	ORIENTDB_PROFILER_ENABLED = true
	ORIENTDB_PROFILER_CONFIG = 30,10,10
	ORIENTDB_POOL_MIN = 1
	ORIENTDB_POOL_MAX = 50
	ORIENTDB_BINARY_SSL_CLIENT_AUTH = false
	ORIENTDB_BINARY_SSL_KEY_STORE = config/cert/orientdb.ks
	ORIENTDB_BINARY_SSL_KEY_STORE_PASSWORD = 123password
	ORIENTDB_BINARY_SSL_TRUST_STORE = config/cert/orientdb.ks
	ORIENTDB_BINARY_SSL_TRUST_STORE_PASSWORD = 123password
	
more info: http://orientdb.com/docs/last/Configuration.html

Example XML File: https://github.com/orientechnologies/orientdb/blob/master/graphdb/config/orientdb-server-config.xml

# OrientDB Tuning
	
	java -Xmx800m -Dstorage.diskCache.bufferSize=7200 ...
	java -server -XX:+PerfDisableSharedMem
	
# OrientDB SSL

	keytool -genkey -alias server -keystore orientdb.ks -keyalg RSA -keysize 2048 -validity 3650
	keytool -export -alias server -keystore orientdb.ks -file orientdb.cert
	keytool -genkey -alias console -keystore orientdb-console.ks -keyalg RSA -keysize 2048 -validity 3650
	keytool -import -alias server -keystore orientdb-console.ts -file orientdb.cert
	
# OrientDB SSL Client Config

	java -Dclient.ssl.enabled=false -Djavax.net.ssl.keyStore=</path/to/keystore> -Djavax.net.ssl.keyStorePassword=<keystorepass> \
        -Djavax.net.ssl.trustStore=</path/to/truststore> -Djavax.net.ssl.trustStorePassword=<truststorepass>

# OrientDB Studio
	
	http://localhost:2480/studio/index.html