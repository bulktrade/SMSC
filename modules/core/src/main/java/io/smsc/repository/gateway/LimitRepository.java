package io.smsc.repository.gateway;

import io.smsc.model.gateway.settings.limit.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreFilter;
import org.springframework.transaction.annotation.Transactional;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link Limit} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "limits", path = "limits")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface LimitRepository extends PagingAndSortingRepository<Limit, Long> {

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#limit?.id == null) and hasAuthority('LIMIT_CREATE')) or " +
            "(!(#limit?.id == null) and hasAuthority('LIMIT_WRITE'))")
    Limit save(@Param("limit") Limit limit);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_DELETE')")
    void delete(Long id);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_READ')")
    Limit findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_READ')")
    Page<Limit> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_READ')")
    Iterable<Limit> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_READ')")
    Iterable<Limit> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_READ')")
    Iterable<Limit> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_DELETE')")
    void delete(Limit limit);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_DELETE')")
    void delete(Iterable<? extends Limit> limits);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('LIMIT_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('LIMIT_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('LIMIT_WRITE'))")
    <S extends Limit> Iterable<S> save(Iterable<S> limits);
}
