package io.smsc.repository.acl;

import io.smsc.model.acl.AclEntry;
import io.smsc.model.acl.AclObjectIdentity;
import io.smsc.model.projections.AclEntryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link AclEntry} entities and exporting them to
 * appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "acl-entries", path = "acl-entries", excerptProjection = AclEntryProjection.class)
@Transactional(readOnly = true)
public interface AclEntryRepository extends JpaRepository<AclEntry, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    AclEntry save(AclEntry aclEntry);

    @Override
    @EntityGraph(attributePaths = {"aclObjectIdentity", "sid", "objectIdClass", ""})
    AclEntry findOne(Long id);

    @EntityGraph(attributePaths = {"aclObjectIdentity", "sid"})
    AclEntry findByAceOrder(@Param("aceOrder") Integer aceOrder);

    @EntityGraph(attributePaths = {"aclObjectIdentity", "sid"})
    AclEntry findByAclObjectIdentity(@Param("aclObjectIdentity") AclObjectIdentity aclObjectIdentity);

    @Override
    @EntityGraph(attributePaths = {"aclObjectIdentity", "sid"})
    Page<AclEntry> findAll(Pageable pageable);
}
