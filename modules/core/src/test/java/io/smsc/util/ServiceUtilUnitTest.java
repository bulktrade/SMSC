package io.smsc.util;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.repository.admin.UserRepository;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ServiceUtilUnitTest extends AbstractSpringMVCTest {

    @Test
    public void getUserRepositoryBean() throws Exception {
       assertThat(ServiceUtil.getUserRepository()).isInstanceOf(UserRepository.class);
    }
}
