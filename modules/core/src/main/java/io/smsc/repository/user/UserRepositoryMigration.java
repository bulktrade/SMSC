package io.smsc.repository.user;

import io.smsc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "migration/users", path = "migration/users", exported = false)
@Transactional(readOnly = true)
public interface UserRepositoryMigration extends JpaRepository<User, Long> {

    @Override
    @Transactional
    User save(@RequestBody User user);

    @Override
    List<User> findAll();
}
