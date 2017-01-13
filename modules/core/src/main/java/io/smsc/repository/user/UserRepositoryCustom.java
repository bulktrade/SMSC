package io.smsc.repository.user;

import io.smsc.model.User;

import java.util.List;

/**
 * This interface is describing additional methods to extend {@link UserRepository}.
 * Methods implementation is in {@link UserRepositoryImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public interface UserRepositoryCustom{

    User addRole(Long userId, Long roleId);

    User removeRole(Long userId, Long roleId);

    User getOneWithDecryptedPassword(Long id);

    User getOneWithRolesAndDecryptedPassword(Long id);

    User getOneByEmailWithDecryptedPassword(String email);

    User getOneByUserNameWithDecryptedPassword(String username);

    List<User> getAllWithRolesAndDecryptedPassword();

    User saveOneWithEncryptedPassword(User user);
}
