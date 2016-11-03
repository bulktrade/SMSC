package io.smsc.rest.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    @Transactional
    @Modifying
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    User save(User user);

    @Override
    @Query("SELECT u FROM User u WHERE u.id=:id")
    User findOne(@Param("id") Long id);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.id=:id")
    User findOneWithRoles(@Param("id") Long id);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.email=:email")
    User findByEmail(@Param("email") String email);

    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.roles")
    List<User> findAllWithRoles();

}
