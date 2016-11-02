package io.smsc.rest.repository.user;

import io.smsc.model.User;

public interface UserRepositoryCustom {

    User addRole(Long userId, Long roleId);

    User removeRole(Long userId, Long roleId);
}
