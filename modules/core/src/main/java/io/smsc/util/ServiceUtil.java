package io.smsc.util;

import io.smsc.repository.admin.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ServiceUtil {
    private static ServiceUtil instance;

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void fillInstance() {
        instance = this;
    }

    public static UserRepository getUserRepository() {
        return instance.userRepository;
    }
}
