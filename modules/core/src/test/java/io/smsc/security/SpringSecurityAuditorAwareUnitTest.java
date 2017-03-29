package io.smsc.security;

import io.smsc.config.SpringSecurityAuditorAware;
import io.smsc.model.admin.User;
import io.smsc.repository.admin.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class SpringSecurityAuditorAwareUnitTest {

    @Mock
    private UserRepository userRepository;

    private SpringSecurityAuditorAware auditorAware;

    @Before
    public void setUp() throws Exception {
        this.auditorAware = new SpringSecurityAuditorAware(userRepository);

        User user = new User();
        user.setUsername("Johnny");

        when(userRepository.me()).thenReturn(user);
    }

    @Test
    public void testAuditorAwareReturnsUserRepositoryMe() throws Exception {
        assertThat(auditorAware.getCurrentAuditor().getUsername()).isEqualTo("Johnny");
    }
}
