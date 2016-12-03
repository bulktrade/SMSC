package io.smsc.repository.user;

import io.smsc.model.User;

import java.util.List;

public interface UserRepositoryCustom {

    User addRole(Long userId, Long roleId);

    User removeRole(Long userId, Long roleId);

    User getOneWithDecryptedPassword(Long id);

    User getOneByEmailWithDecryptedPassword(String email);

    User getOneByUserNameWithDecryptedPassword(String username);

    List<User> getAllWithDecryptedPassword();

    User saveOneWithEncryptedPassword(User user);
}
