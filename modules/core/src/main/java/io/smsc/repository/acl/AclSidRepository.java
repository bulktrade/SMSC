package io.smsc.repository.acl;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.acl.AclSid;
import io.smsc.model.acl.QAclSid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link AclSid} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "acl-sid", path = "acl-sid")
@Transactional(readOnly = true)
public interface AclSidRepository extends JpaRepository<AclSid, Long>,
        QueryDslPredicateExecutor<AclSid>,
        QuerydslBinderCustomizer<QAclSid> {

    @Override
    default public void customize(QuerydslBindings bindings, QAclSid root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclSid save(AclSid aclSid);

    @Override
    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclSid findOne(Long id);

    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclSid findBySid(@Param("sid") String sid);

    @Override
    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<AclSid> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"aclEntries", "aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<AclSid> findAll(Predicate predicate, Pageable pageable);
}
