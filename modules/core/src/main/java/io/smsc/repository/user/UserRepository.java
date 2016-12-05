package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, CrudRepository<User, Long>, UserRepositoryCustom {

    @Override
    void delete(Long id);

    @Override
    User save(User user);

    @Override
    @EntityGraph(attributePaths = {"roles"})
    User findOne(Long id);

    @Override
    @EntityGraph(attributePaths = {"roles"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"roles"})
    User findByEmail(String email);

    @EntityGraph(attributePaths = {"roles"})
    User findByUserName(String username);

}
