package io.smsc.repository.acl;

import io.smsc.model.acl.AclClass;
import io.smsc.model.acl.AclObjectIdentity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link AclObjectIdentity} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "acl-object-identities", path = "acl-object-identities")
@Transactional(readOnly = true)
public interface AclObjectIdentityRepository extends JpaRepository<AclObjectIdentity, Long> {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    AclObjectIdentity save(AclObjectIdentity aclObjectIdentity);

    @Override
    @EntityGraph(attributePaths = {"parentObject", "ownerSid", "aclEntries"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    AclObjectIdentity findOne(Long id);

    @EntityGraph(attributePaths = {"parentObject", "ownerSid", "aclEntries"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    AclObjectIdentity findByObjectIdIdentity(@Param("objectIdIdentity") Long objectIdIdentity);

    @EntityGraph(attributePaths = {"parentObject", "ownerSid", "aclEntries"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    AclObjectIdentity findByObjectIdClass(@Param("objectIdClass") AclClass objectIdClass);

    @Override
    @EntityGraph(attributePaths = {"parentObject", "ownerSid", "aclEntries"})
    @PreAuthorize("hasAuthority('USER_2') or hasAuthority('GROUP_2')")
    Page<AclObjectIdentity> findAll(Pageable pageable);
}
