package io.smsc.repository.user;

import io.smsc.model.User;
import io.smsc.model.projections.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * This REST repository class is used for providing default {@link JpaRepository}
 * CRUD methods to operate with {@link User} entities and exporting them to
 * appropriate endpoints.
 *
 * @author  Nazar Lipkovskyy
 * @see     UserRepositoryCustom
 * @see     UserRepositoryImpl
 * @since   0.0.1-SNAPSHOT
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users", excerptProjection = UserProjection.class)
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    //All query method resources are exposed under the resource 'search'.

    @Override
    @Transactional
    void delete(Long id);
}
