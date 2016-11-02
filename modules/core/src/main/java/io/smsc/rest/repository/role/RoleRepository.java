package io.smsc.rest.repository.role;

import io.smsc.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>, RoleRepositoryCustom {

    @Transactional
    @Modifying
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
//    @Query("SELECT r FROM Role r WHERE r.id=:id")
    Role findOne(Long id);

    @Override
    @Query("SELECT DISTINCT r FROM Role r")
    List<Role> findAll();


}
