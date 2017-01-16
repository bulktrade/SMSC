package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

/**
 * This interface is describing additional methods to extend {@link UserRepository}.
 * Methods implementation is in {@link UserRepositoryImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@NoRepositoryBean
public interface UserRepositoryCustom<T, ID extends Serializable>{

    User addRole(ID userId, ID roleId);

    User removeRole(ID userId, ID roleId);

    User getOneWithDecryptedPassword(ID id);

    User getOneWithRolesAndDecryptedPassword(ID id);

    User getOneByEmailWithDecryptedPassword(String email);

    User getOneByUserNameWithDecryptedPassword(String username);

    List<User> getAllWithRolesAndDecryptedPassword();

    User saveOneWithEncryptedPassword(User user);
}
