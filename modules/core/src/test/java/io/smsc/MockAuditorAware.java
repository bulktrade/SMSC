package io.smsc;

import io.smsc.model.admin.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component
public class MockAuditorAware implements AuditorAware<User> {

    private User currentUser;

    @Override
    public User getCurrentAuditor() {
        return currentUser;
    }

    public void setCurrentAuditor(User user) {
        this.currentUser = user;
    }
}
