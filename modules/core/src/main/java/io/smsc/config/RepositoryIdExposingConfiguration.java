package io.smsc.config;

import io.smsc.model.mcc.Mcc;
import io.smsc.model.mcc.MccPK;
import io.smsc.model.admin.Authority;
import io.smsc.model.admin.Group;
import io.smsc.model.admin.Role;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.Contact;
import io.smsc.model.customer.User;
import io.smsc.model.dashboard.Dashboard;
import io.smsc.model.dashboard.DashboardBox;
import io.smsc.model.dashboard.DashboardBoxType;
import io.smsc.repository.MccRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.spi.BackendIdConverter;

import java.io.Serializable;

/**
 * The RepositoryIdExposingConfiguration class is used for providing ID value exposing
 * as a normal property for all entity classes.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@Configuration
public class RepositoryIdExposingConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.withEntityLookup().forRepository(MccRepository.class, (Mcc mcc) -> {
            MccPK pk = new MccPK();
            pk.setMcc(mcc.getMcc());
            pk.setCode(mcc.getCode());
            return pk;
        }, MccRepository::findOne);

        config.exposeIdsFor(io.smsc.model.admin.User.class, User.class, Role.class, Authority.class, Group.class, Customer.class, Contact.class,
                Dashboard.class, DashboardBox.class, DashboardBoxType.class, Mcc.class);
    }

    @Bean
    public BackendIdConverter MccIdConverter() {
        return new BackendIdConverter() {

            @Override
            public boolean supports(Class<?> delimiter) {
                return Mcc.class.equals(delimiter);
            }

            @Override
            public String toRequestId(Serializable id, Class<?> entityType) {
                MccPK pk = (MccPK) id;
                return String.format("%d_%d", pk.getMcc(), pk.getCode());
            }

            @Override
            public Serializable fromRequestId(String id, Class<?> entityType) {
                if (id == null){
                    return null;
                }
                String[] parts = id.split("_");
                MccPK pk = new MccPK();
                pk.setMcc(Integer.valueOf(parts[0]));
                pk.setCode(Integer.valueOf(parts[1]));
                return pk;
            }
        };
    }
}
