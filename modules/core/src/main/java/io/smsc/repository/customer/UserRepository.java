package io.smsc.repository.customer;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.customer.QUser;
import io.smsc.model.customer.User;
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
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link io.smsc.model.admin.User} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "customer-users", path = "customer-users")
@Transactional(readOnly = true)
@Repository("CustomerUserRepository")
public interface UserRepository extends JpaRepository<User, Long>,
        QueryDslPredicateExecutor<User>,
        QuerydslBinderCustomizer<QUser> {

    @Override
    default public void customize(QuerydslBindings bindings, QUser root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
        bindings.excluding(root.password);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User save(User user);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User findOne(Long id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User findByUsername(@Param("username") String userName);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    User findByEmail(@Param("email") String email);

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<User> findAll(Pageable pageable);
}
