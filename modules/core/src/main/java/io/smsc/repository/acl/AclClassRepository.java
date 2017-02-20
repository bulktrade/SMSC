package io.smsc.repository.acl;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.acl.AclClass;
import io.smsc.model.acl.QAclClass;
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
 * CRUD methods to operate with {@link AclClass} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "acl-classes", path = "acl-classes")
@Transactional(readOnly = true)
public interface AclClassRepository extends JpaRepository<AclClass, Long>,
        QueryDslPredicateExecutor<AclClass>,
        QuerydslBinderCustomizer<QAclClass> {

    @Override
    default public void customize(QuerydslBindings bindings, QAclClass root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclClass save(AclClass aclClass);

    @Override
    @EntityGraph(attributePaths = {"aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclClass findOne(Long id);

    @EntityGraph(attributePaths = {"aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    AclClass findByClassName(@Param("className") String className);

    @Override
    @EntityGraph(attributePaths = {"aclObjectIdentities"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<AclClass> findAll(Pageable pageable);
}
