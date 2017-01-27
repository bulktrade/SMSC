package io.smsc.db.migration;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import io.smsc.model.dashboard.*;
import io.smsc.repository.customer.customer.CustomerRepository;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository;
import io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * This class is used for providing java based flyway migration service
 * using custom configuration {@link io.smsc.config.FlywayConfiguration}.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
@Component
public class V1_2__populateDB implements SpringJdbcMigration {

    private final RoleRepository roleRepository;

    private UserRepository userRepository;

    private final CustomerRepository customerRepository;

    private final CustomerContactRepository customerContactRepository;

    private final DashboardRepository dashboardRepository;

    private final DashboardBoxRepository dashboardBoxRepository;

    private final DashboardBoxTypeRepository dashboardBoxTypeRepository;

    /**
     * String, which is used for {@link org.springframework.security.crypto.encrypt.TextEncryptor} creating
     */
    @Value("${encrypt.key}")
    private String secretKey;

    @Autowired
    public V1_2__populateDB(RoleRepository roleRepository, UserRepository userRepository,
                            CustomerRepository customerRepository, CustomerContactRepository customerContactRepository, DashboardRepository dashboardRepository,
                            DashboardBoxRepository dashboardBoxRepository, DashboardBoxTypeRepository dashboardBoxTypeRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.customerContactRepository = customerContactRepository;
        this.dashboardRepository = dashboardRepository;
        this.dashboardBoxRepository = dashboardBoxRepository;
        this.dashboardBoxTypeRepository = dashboardBoxTypeRepository;
    }

    /**
     * Executes this migration. The execution will automatically take place within a transaction, when the underlying
     * database supports it.
     *
     * @param  jdbcTemplate The jdbcTemplate to use to execute statements.
     * @throws Exception    when the migration failed.
     */
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {
        Role role_user = new Role(null, "ROLE_USER");
        Role role_admin = new Role(null, "ROLE_ADMIN");
        User user = new User(null,"user","password","userName","userSurname","user@gmail.com",true,false);
        User admin = new User(null,"admin","admin","adminName","adminSurname","admin@gmail.com",true,false);
        Role user_role = roleRepository.save(role_user);
        Role admin_role = roleRepository.save(role_admin);
        Set<Role> userRole = new HashSet<>();
        userRole.add(user_role);
        Set<Role> adminRole = new HashSet<>();
        adminRole.add(admin_role);
        user.setRoles(userRole);
        admin.setRoles(adminRole);
        CryptoConverter.encrypt(user,secretKey);
        CryptoConverter.encrypt(admin,secretKey);
        User new_user = userRepository.save(user);
        User new_admin = userRepository.save(admin);
        Customer customer = new Customer(null, 1.0, "SMSC", "Amtsgericht", "Amtsgericht", "3254", "Germany", "Stuttgart", 5672394.0);
        Set<User> users = new HashSet<>(userRepository.findAllDistinctByOrderById());
        customer.setUsers(users);
        Customer newCustomer = customerRepository.save(customer);
        CustomerContact customerContact = new CustomerContact(null, "SMSC", "SMSC", "0674329568", "0504569753", "fake_fax", "smsc@bulk.io", Type.CEO, Salutation.MR);
        customerContact.setCustomer(newCustomer);
        customerContactRepository.save(customerContact);
        Dashboard dashboard = new Dashboard(null, "default", "user", new_user);
        Dashboard newDashboard = dashboardRepository.save(dashboard);
        DashboardBoxType dashboardBoxType1 = new DashboardBoxType(null, "Ivan feeds", io.smsc.model.dashboard.Type.STATUS, Kind.FEEDBACK_STATUS);
        DashboardBoxType dashboardBoxType2 = new DashboardBoxType(null, "Petia profit", io.smsc.model.dashboard.Type.CHART, Kind.PIE_CHART);
        DashboardBoxType dashboardBoxType3 = new DashboardBoxType(null, "Rusia chart profit", io.smsc.model.dashboard.Type.CHART, Kind.SERIAL_CHART);
        DashboardBoxType dashboardBoxType4 = new DashboardBoxType(null, "Ivan chart profit", io.smsc.model.dashboard.Type.CHART, Kind.LINE_CHART);
        DashboardBoxType dashboardBoxType5 = new DashboardBoxType(null, "Kolia chart profit", io.smsc.model.dashboard.Type.CHART, Kind.BAR_CHART);
        DashboardBoxType dashboardBoxType6 = new DashboardBoxType(null, "Masha bubble chartat", io.smsc.model.dashboard.Type.CHART, Kind.BUBBLE_CHART);
        DashboardBoxType newDashboardBoxType1 = dashboardBoxTypeRepository.save(dashboardBoxType1);
        DashboardBoxType newDashboardBoxType2 = dashboardBoxTypeRepository.save(dashboardBoxType2);
        DashboardBoxType newDashboardBoxType3 = dashboardBoxTypeRepository.save(dashboardBoxType3);
        DashboardBoxType newDashboardBoxType4 = dashboardBoxTypeRepository.save(dashboardBoxType4);
        DashboardBoxType newDashboardBoxType5 = dashboardBoxTypeRepository.save(dashboardBoxType5);
        DashboardBoxType newDashboardBoxType6 = dashboardBoxTypeRepository.save(dashboardBoxType6);
        DashboardBox dashboardBox1 = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 1, "Box 1", "Box 1 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox2 = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 2, "Box 2", "Box 2 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox3 = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 3, "Box 3", "Box 3 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox4 = new DashboardBox(null, Width.WIDTH_25, Height.HEIGHT_25, 4, "Box 4", "Box 4 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox5 = new DashboardBox(null, Width.WIDTH_50, Height.HEIGHT_50, 5, "Box 5", "Box 5 desc", newDashboard, newDashboardBoxType2);
        DashboardBox dashboardBox6 = new DashboardBox(null, Width.WIDTH_50, Height.HEIGHT_50, 6, "Box 6", "Box 6 desc", newDashboard, newDashboardBoxType3);
        DashboardBox dashboardBox7 = new DashboardBox(null, Width.WIDTH_50, Height.HEIGHT_50, 7, "Box 7", "Box 7 desc", newDashboard, newDashboardBoxType4);
        DashboardBox dashboardBox8 = new DashboardBox(null, Width.WIDTH_50, Height.HEIGHT_50, 8, "Box 8", "Box 8 desc", newDashboard, newDashboardBoxType5);
        DashboardBox dashboardBox9 = new DashboardBox(null, Width.WIDTH_50, Height.HEIGHT_50, 9, "Box 9", "Box 9 desc", newDashboard, newDashboardBoxType6);
        dashboardBoxRepository.save(dashboardBox1);
        dashboardBoxRepository.save(dashboardBox2);
        dashboardBoxRepository.save(dashboardBox3);
        dashboardBoxRepository.save(dashboardBox4);
        dashboardBoxRepository.save(dashboardBox5);
        dashboardBoxRepository.save(dashboardBox6);
        dashboardBoxRepository.save(dashboardBox7);
        dashboardBoxRepository.save(dashboardBox8);
        dashboardBoxRepository.save(dashboardBox9);
    }
}
