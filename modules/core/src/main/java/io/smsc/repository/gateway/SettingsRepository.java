package io.smsc.repository.gateway;

import io.smsc.model.gateway.settings.Settings;
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
 * CRUD methods to operate with {@link Settings} entities and exporting them to
 * appropriate endpoints.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "settings", path = "settings")
@Transactional(readOnly = true)
@PreAuthorize("hasRole('ADMIN_USER')")
public interface SettingsRepository extends PagingAndSortingRepository<Settings, Long> {

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or ((#settings?.id == null) and hasAuthority('SETTINGS_CREATE')) or " +
            "(!(#settings?.id == null) and hasAuthority('SETTINGS_WRITE'))")
    Settings save(@Param("settings") Settings settings);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_DELETE')")
    void delete(Long id);

    @Override
    @PostAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_READ')")
    Settings findOne(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_READ')")
    Page<Settings> findAll(Pageable pageable);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_READ')")
    Iterable<Settings> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_EXISTS')")
    boolean exists(Long id);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_READ')")
    Iterable<Settings> findAll();

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_READ')")
    Iterable<Settings> findAll(Iterable<Long> ids);

    @Override
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_COUNT')")
    long count();

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_DELETE')")
    void delete(Settings settings);

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_DELETE')")
    void delete(Iterable<? extends Settings> settings);

    @Override
    @Transactional
    @PreAuthorize("hasRole('POWER_ADMIN_USER') or hasAuthority('SETTINGS_DELETE')")
    void deleteAll();

    @Override
    @Transactional
    @PreFilter("hasRole('POWER_ADMIN_USER') or ((filterObject.id == null) and hasAuthority('SETTINGS_CREATE')) or " +
            "(!(filterObject.id == null) and hasAuthority('SETTINGS_WRITE'))")
    <S extends Settings> Iterable<S> save(Iterable<S> settings);
}
