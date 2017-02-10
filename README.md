[![Heroku](http://heroku-badge.herokuapp.com/?app=smsc&style=flat&svg=1)](http://staging.smsc.io)
[![Build Status](https://travis-ci.org/bulktrade/SMSC.svg?branch=master)](https://travis-ci.org/bulktrade/SMSC)
[![Apache 2.0 License](https://img.shields.io/badge/license-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![Coverage Status](https://coveralls.io/repos/github/bulktrade/SMSC/badge.svg?branch=master)](https://coveralls.io/github/bulktrade/SMSC?branch=master)
[![Join the chat at https://gitter.im/smsc-io/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/smsc-io/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/bulktrade/SMSC.svg)](https://david-dm.org/bulktrade/SMSC)
[![devDependency Status](https://david-dm.org/bulktrade/SMSC/dev-status.svg)](https://david-dm.org/bulktrade/SMSC/?type=dev)
[![Quality Gate](https://sonarqube.com/api/badges/gate?key=io.smsc:smsc)](https://sonarqube.com/dashboard/index/io.smsc:smsc) 
[![Technical debt ratio](https://sonarqube.com/api/badges/measure?key=io.smsc:smsc&metric=sqale_debt_ratio)](https://sonarqube.com/dashboard/index/io.smsc:smsc)
[![javadoc.io](https://javadoc-emblem.rhcloud.com/doc/io.smsc/smsc/badge.svg)](http://www.javadoc.io/doc/io.smsc/smsc)
[![Selenium Test Status](https://saucelabs.com/buildstatus/smsc)](https://saucelabs.com/beta/builds/1e2ccc4a03864f668fb413c1934255e7)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/smsc.svg)](https://saucelabs.com/u/smsc)


# smsc.io
SMSC Open Source Solution with Monitoring, Billing, SMPP, SS7 and REST API support.

## Start admin module

### Installation
* `cd modules/admin`
* `npm install`

### Serve
* `npm start` 

> go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

### Admin module credentials
	
	Username: admin
	Password: admin
	URL: /admin
	
## Start core module

### Start Spring boot application
* `cd modules/core`
* `mvn spring-boot:run`

### Receive access and refresh tokens
 POST request on [http://localhost:8080/rest/auth/token](http://localhost:8080/rest/auth/token) with valid credentials
 
### Admin credentials
 
	Username: admin
	Password: admin
	
### User credentials

	Username: user
	Password: password
	
### Docker images launching

* PostgreSQL   
`$ docker run -d -p 5432:5432 -e POSTGRESQL_USER=test -e POSTGRESQL_PASS=oe9jaacZLbR9pN 
-e POSTGRESQL_DB=smsc orchardup/postgresql` 
* MySQL   
`$ docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=smsc 
-e MYSQL_USER=user -e MYSQL_PASSWORD=password -d mysql:latest` 
* Oracle  
`$ docker run -d --shm-size=2g -p 1521:1521 alexeiled/docker-oracle-xe-11g` 

### HAL Browser

    /rest/repository/browser/index.html

### Default application properties (can be changed through system properties (use -D))
* `smsc.database.dialect = postgresql` - database, which is used (other options - mysql, oracle, hsqldb, h2)
* `encrypt.key = smsc.io` - used in password encryption
* `jwt.header = X-Authorization` - name of request header, which is used for JWT authentication
* `jwt.secret = smsc.io` - used in access token signature
* `jwt.expiration = 3600` - lifetime of access token (seconds).

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)
Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test our project in real browsers.

[<img src="doc/logos/logo_JetBrains_1.png" width="120">](http://www.jetbrains.com/)
Thank you to [JetBrains](http://www.jetbrains.com/) for providing the tools that allows us to developer our project in the best IDE's.

[<img src="https://saucelabs.com/content/images/logo.png" width="120">](https://saucelabs.com)
Thank you to [Saucelabs](https://saucelabs.com/) for providing the infrastructure that allows us to test our project in real browsers.
