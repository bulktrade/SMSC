package io.smsc.rest.repository;

import io.smsc.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    @Modifying
    @Transactional
    int deleteById(@Param("id") long id);

    @Override
    @Transactional
    Permission save(Permission permission);

    @Override
    Permission findOne(Long id);

    @Override
    List<Permission> findAll();
}
