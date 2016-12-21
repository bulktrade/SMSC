package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
//    @PreAuthorize("hasRole('ADMIN') or (hasAuthority('USER_CREATE') and #user.id == null) or hasAuthority('USER_UPDATE')")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_CREATE') or hasAuthority('USER_UPDATE')")
    User save(@RequestBody  User user);

    @Override
    @EntityGraph(attributePaths = {"roles", "dashboards"})
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    User findOne(Long id);

    @EntityGraph(attributePaths = {"roles", "dashboards"})
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ') or hasAuthority('USER_READ_OWN')")
//    @RestResource(exported = false)
    User findByEmail(@Param("email")String email);

    @EntityGraph(attributePaths = {"roles", "dashboards"})
//    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    @RestResource(exported = false)
    User findByUsername(@Param("username")String username);

    // /rest/repository/users/search/findAll
    @EntityGraph(attributePaths = {"roles", "dashboards"})
    @RestResource(path = "findAll")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    List<User> findAllDistinctByOrderById();

    // Prevents GET /users
    @Override
    @RestResource(exported = false)
    Page<User> findAll(Pageable pageable);

}
