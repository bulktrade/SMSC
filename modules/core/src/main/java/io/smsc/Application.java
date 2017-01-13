package io.smsc;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

import java.security.Security;

@SpringBootApplication
@PropertySource(value = "classpath:application.properties")
@PropertySource(value = "classpath:${smsc.database.dialect:hsqldb}.properties")
@ComponentScan("io.smsc")
public class Application {

    public static void main(String[] args) {
//    Solution of JCE problem for JDK 9 (reflection is not more needed)
      Security.setProperty("crypto.policy", "unlimited");
      SpringApplication.run(Application.class, args);
    }
}
