package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * This interface is describing methods to extend {@link UserRepository}.
 * Methods implementation is in {@link UserRepositoryImpl}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public interface UserRepositoryCustom{

    User findOne(Long userId);

    User findByUserName(String userName);

    User findByEmail(String userName);

    Page<User> findAll(Pageable pageable);

    User save(User user);
}
