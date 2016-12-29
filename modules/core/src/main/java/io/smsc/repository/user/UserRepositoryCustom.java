package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
