package io.smsc.config;

import io.smsc.model.admin.User;
import io.smsc.repository.admin.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * The SpringSecurityAuditorAware class is used for providing awareness
 * about application's current auditor.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.3-SNAPSHOT
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<User> {

    private final UserRepository userRepository;

    @Autowired
    public SpringSecurityAuditorAware(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns the current auditor of the application.
     *
     * @return the current auditor
     */
    @Override
    public User getCurrentAuditor() {

        return userRepository.me();
    }
}
