package io.smsc.repository.gateway;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.notification.QNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
 * CRUD methods to operate with {@link Notification} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "notifications", path = "notifications")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface NotificationRepository extends PagingAndSortingRepository<Notification, Long>,
        QueryDslPredicateExecutor<Notification>,
        QuerydslBinderCustomizer<QNotification> {

    @Override
    default void customize(QuerydslBindings bindings, QNotification root) {
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::startsWithIgnoreCase);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#notification?.id == null) and hasAuthority('NOTIFICATION_CREATE')) or " +
            "(!(#notification?.id == null) and hasAuthority('NOTIFICATION_WRITE'))")
    Notification save(@Param("notification") Notification notification);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_DELETE')")
    void delete(Long id);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Notification findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Page<Notification> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Page<Notification> findAll(Predicate predicate, Pageable pageable);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Notification findOne(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(Predicate predicate, Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(Predicate predicate, OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(OrderSpecifier<?>[] orders);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_COUNT')")
    long count(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_EXISTS')")
    boolean exists(Predicate predicate);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_READ')")
    Iterable<Notification> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_DELETE')")
    void delete(Notification notification);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_DELETE')")
    void delete(Iterable<? extends Notification> notifications);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('NOTIFICATION_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('NOTIFICATION_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('NOTIFICATION_WRITE'))")
    <S extends Notification> Iterable<S> save(Iterable<S> notifications);
}
