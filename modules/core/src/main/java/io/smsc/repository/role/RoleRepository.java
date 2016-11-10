package io.smsc.repository.role;

import io.smsc.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "role", path = "rest/repository/role")
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>, RoleRepositoryCustom {

    @Transactional
    @Modifying
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
    Role findOne(Long id);

    @Query("SELECT r FROM Role r LEFT JOIN r.permissions WHERE r.id=:id")
    Role findOneWithPermissions(Long id);

    @Override
    @Query("SELECT r FROM Role r ORDER BY r.id")
    List<Role> findAll();

    @Query("SELECT r FROM Role r LEFT JOIN r.permissions")
    Role findAllWithPermissions(Long id);


}
