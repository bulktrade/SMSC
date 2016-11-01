package io.smsc.rest.repository;

import io.smsc.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.id=:id")
    int delete(@Param("id") long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
    @Query("SELECT r FROM Role r LEFT JOIN FETCH r.permissions WHERE r.id=:id")
    Role findOne(@Param("id") Long id);

    @Override
    @Query("SELECT DISTINCT r FROM Role r LEFT JOIN FETCH r.permissions")
    List<Role> findAll();


}
