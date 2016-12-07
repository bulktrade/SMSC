package io.smsc.repository.role;

import io.smsc.model.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>, RoleRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    void delete(Long id);

    @Override
    Role save(Role role);

    @Override
    @EntityGraph(attributePaths = {"permissions"})
    Role findOne(Long id);

    // /rest/repository/roles/search/findByName?name=...
    @EntityGraph(attributePaths = {"permissions"})
    Role findByName(@Param("name")String name);

    @EntityGraph(attributePaths = {"permissions"})
    List<Role> findAllDistinctByOrderById();
}
