package io.smsc.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.Authority;
import io.smsc.model.QAuthority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
 * CRUD methods to operate with {@link Authority} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "authorities", path = "authorities")
@Transactional(readOnly = true)
// until role hierarchy is implemented
@PreAuthorize("hasRole('ADMIN_USER') or hasRole('POWER_ADMIN_USER')")
public interface AuthorityRepository extends JpaRepository<Authority, Long>,
        QueryDslPredicateExecutor<Authority>,
        QuerydslBinderCustomizer<QAuthority> {

    @Override
    default public void customize(QuerydslBindings bindings, QAuthority root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority save(Authority authority);

    @Override
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority findOne(Long id);

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Authority findByName(@Param("name") String name);

    @Override
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<Authority> findAll(Pageable pageable);

    @Override
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<Authority> findAll(Predicate predicate, Pageable pageable);
}
