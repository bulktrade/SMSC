package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This repository class is used only for providing {@link User} {@code save} and {@code findAll}
 * methods in java based flyway migration without using {@link io.smsc.security.JWTAuthenticationTokenFilter}
 * filter. Methods of this repository class will not be exported.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
@Transactional(readOnly = true)
public interface UserMigrationRepository extends JpaRepository<User, Long> {

    @Override
    @Transactional
    @RestResource(exported = false)
    User save(@RequestBody User user);

    @EntityGraph(attributePaths = {"roles", "dashboards"})
    @RestResource(exported = false)
    List<User> findAllDistinctByOrderById();
}
