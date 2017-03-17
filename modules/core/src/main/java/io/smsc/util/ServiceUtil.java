package io.smsc.util;

import io.smsc.repository.admin.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * This class contains static method to return {@link UserRepository} bean.
 *
 * @author Sergej Kunz
 * @since 0.0.2-SNAPSHOT
 */
@Component
public class ServiceUtil {
    private static ServiceUtil instance;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void fillInstance() {
        instance = this;
    }

    /**
     * Return {@link UserRepository} bean.
     */
    public static UserRepository getUserRepository() {
        return instance.userRepository;
    }
}
