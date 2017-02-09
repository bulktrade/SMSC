package io.smsc.repository.acl;

import io.smsc.model.acl.AclSid;
import io.smsc.model.projections.AclSidProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link AclSid} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "acl-sid", path = "acl-sid", excerptProjection = AclSidProjection.class)
@Transactional(readOnly = true)
public interface AclSidRepository extends JpaRepository<AclSid, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);

    @Override
    @Transactional
    AclSid save(AclSid aclSid);

    @Override
    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    AclSid findOne(Long id);

    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    AclSid findBySid(@Param("sid") String sid);

    @Override
    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    Page<AclSid> findAll(Pageable pageable);
}
