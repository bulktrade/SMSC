package io.smsc.repository.customer;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.QContact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Contact} entities and exporting them
 * to appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "contacts", path = "contacts")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface ContactRepository extends PagingAndSortingRepository<Contact, Long>,
        QueryDslPredicateExecutor<Contact>,
        QuerydslBinderCustomizer<QContact> {

    @Override
    default public void customize(QuerydslBindings bindings, QContact root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_DELETE')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#contact?.id == null) and hasAuthority('CONTACT_CREATE')) or " +
            "(!(#contact?.id == null) and hasAuthority('CONTACT_WRITE'))")
    Contact save(@Param("contact") Contact contact);

    @Override
    @EntityGraph(attributePaths = {"type", "salutation"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Contact findOne(Long id);

    @EntityGraph(attributePaths = {"type", "salutation"})
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Contact findByEmailAddress(@Param("emailAddress") String emailAddress);

    @Override
    @EntityGraph(attributePaths = {"type", "salutation"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Page<Contact> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"type", "salutation"})
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Page<Contact> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Contact findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(Sort sort);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('CONTACT_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('CONTACT_WRITE'))")
    <S extends Contact> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_READ')")
    Iterable<Contact> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_DELETE')")
    void delete(Contact contact);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_DELETE')")
    void delete(Iterable<? extends Contact> contacts);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('CONTACT_DELETE')")
    void deleteAll();
}
