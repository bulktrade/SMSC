package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_DELETE')")
    void delete(Long id);

    @Override
    @PreAuthorize("hasRole('ADMIN') or (hasAuthority('USER_CREATE') and #user.id == null) or hasAuthority('USER_UPDATE')")
    User save(User user);

    // /rest/repository/users/search/findOne?id=...
    @Override
    @EntityGraph(attributePaths = {"roles"})
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    User findOne(@Param("id") Long id);

    // /rest/repository/users/search/findByEmail?email=...
    @EntityGraph(attributePaths = {"roles"})
//    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ') or hasAuthority('USER_READ_OWN')")
    User findByEmail(@Param("email")String email);

    // /rest/repository/users/search/findByUserName?username=...
    @EntityGraph(attributePaths = {"roles"})
//    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    User findByUserName(@Param("username")String username);

    // /rest/repository/users/search/findAll
    @EntityGraph(attributePaths = {"roles"})
    @RestResource(path = "findAll")
    @PreAuthorize("hasRole('ADMIN') or hasAuthority('USER_READ')")
    List<User> findAllDistinctByOrderById();

}
