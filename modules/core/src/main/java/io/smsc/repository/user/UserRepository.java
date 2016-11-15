package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Transactional
    @Modifying
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    User save(User user);

    @Override
    User findOne(@Param("id") Long id);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.id=:id")
    User findOneWithRoles(@Param("id") Long id);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.email=:email")
    User findByEmail(@Param("email") String email);

    @Override
    @Query("SELECT u FROM User u ORDER BY u.id")
    List<User> findAll();

    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.roles")
    List<User> findAllWithRoles();

}
