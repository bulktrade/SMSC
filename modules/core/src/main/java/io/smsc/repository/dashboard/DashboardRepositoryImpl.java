package io.smsc.repository.dashboard;

import io.smsc.jwt.model.JWTUser;
import io.smsc.model.admin.User;
import io.smsc.model.dashboard.Dashboard;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of {@link DashboardRepositoryCustom} with overridden save methods
 * to allow logged user to save only his dashboards.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
@Transactional
@SuppressWarnings("unchecked")
public class DashboardRepositoryImpl implements DashboardRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Dashboard save(Dashboard dashboard) {
        Dashboard currentDashboard;

        if (null == dashboard.getId()) {
            dashboard.setUser(getLoggedUser());
            em.persist(dashboard);
            return dashboard;
        } else {
            currentDashboard = em.find(Dashboard.class, dashboard.getId());
            if (null == currentDashboard) {
                throw new EmptyResultDataAccessException("Dashboard with id = " + dashboard.getId() +  " doesn't exists", 1);
            }

            if (currentDashboard.getUser().getId().equals(getLoggedUser().getId())) {
                return em.merge(dashboard);
            }

            throw new AccessDeniedException("Logged user has no access to update current dashboard");
        }
    }

    @Override
    public <S extends Dashboard> Iterable<S> save(Iterable<S> dashboards) {
        List<S> result = new ArrayList<>();

        if (dashboards == null) {
            return result;
        }

        for (S dashboard : dashboards) {
            result.add((S) save(dashboard));
        }

        return result;
    }

    private User getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (null == authentication || null == authentication.getPrincipal()) {
            throw new UsernameNotFoundException("Logged user is not available");
        }

        JWTUser jwtUser = (JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return em.find(User.class, jwtUser.getId());
    }
}
