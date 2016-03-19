package io.smsc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.orient.commons.repository.config.EnableOrientRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by deacix on 08.02.16.
 */
@Configuration
@EnableTransactionManagement
@EnableOrientRepositories("io.smsc.repository")
public class OrientDB {
}
