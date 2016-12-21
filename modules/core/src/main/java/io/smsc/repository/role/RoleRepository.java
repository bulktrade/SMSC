package io.smsc.repository.role;

import io.smsc.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
@Transactional(readOnly = true)
public interface RoleRepository extends JpaRepository<Role, Long>, RoleRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    Role save(Role role);

    @Override
//    @EntityGraph(attributePaths = {"permissions"})
    Role findOne(Long id);

//    @EntityGraph(attributePaths = {"permissions"})
    Role findByName(@Param("name")String name);

    // /rest/repository/roles/search/findAll
//    @EntityGraph(attributePaths = {"permissions"})
    @RestResource(path = "findAll")
    List<Role> findAllDistinctByOrderById();

    // Prevents GET /roles
    @Override
    @RestResource(exported = false)
    Page<Role> findAll(Pageable pageable);
}
