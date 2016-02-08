package io.smsc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.orient.commons.repository.config.EnableOrientRepositories;

/**
 * Created by deacix on 08.02.16.
 */
@Configuration
@EnableOrientRepositories("io.smsc.repository")
public class OrientDB {
}
