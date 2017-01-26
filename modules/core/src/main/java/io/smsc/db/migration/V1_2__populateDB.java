package io.smsc.db.migration;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Permission;
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
import io.smsc.repository.permission.PermissionRepository;
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

    private final PermissionRepository permissionRepository;

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
    public V1_2__populateDB(PermissionRepository permissionRepository, RoleRepository roleRepository, UserRepository userRepository,
                            CustomerRepository customerRepository, CustomerContactRepository customerContactRepository, DashboardRepository dashboardRepository,
                            DashboardBoxRepository dashboardBoxRepository, DashboardBoxTypeRepository dashboardBoxTypeRepository) {
        this.permissionRepository = permissionRepository;
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
        Permission permission1 = new Permission(null, "USER_READ");
        Permission permission2 = new Permission(null, "USER_UPDATE");
        Permission permission3 = new Permission(null, "USER_CREATE");
        Permission permission4 = new Permission(null, "USER_DELETE");
        Permission permission5 = new Permission(null, "USER_READ_OWN");
        Permission permission6 = new Permission(null, "USER_UPDATE_OWN");
        Permission permission7 = new Permission(null, "ROLE_READ");
        Permission permission8 = new Permission(null, "ROLE_UPDATE");
        Permission permission9 = new Permission(null, "ROLE_CREATE");
        Permission permission10 = new Permission(null, "ROLE_DELETE");
        Permission permission11 = new Permission(null, "PERMISSION_READ");
        Permission permission12 = new Permission(null, "PERMISSION_UPDATE");
        Permission permission13 = new Permission(null, "PERMISSION_CREATE");
        Permission permission14 = new Permission(null, "PERMISSION_DELETE");
        Permission permission15 = new Permission(null, "CRUD_CLASS_META_DATA_READ");
        Permission permission16 = new Permission(null, "CRUD_CLASS_META_DATA_UPDATE");
        Permission permission17 = new Permission(null, "CRUD_CLASS_META_DATA_CREATE");
        Permission permission18 = new Permission(null, "CRUD_CLASS_META_DATA_DELETE");
        Permission permission19 = new Permission(null, "CRUD_META_FORM_DATA_READ");
        Permission permission20 = new Permission(null, "CRUD_META_FORM_DATA_UPDATE");
        Permission permission21 = new Permission(null, "CRUD_META_FORM_DATA_CREATE");
        Permission permission22 = new Permission(null, "CRUD_META_FORM_DATA_DELETE");
        Permission permission23 = new Permission(null, "CRUD_META_GRID_DATA_READ");
        Permission permission24 = new Permission(null, "CRUD_META_GRID_DATA_UPDATE");
        Permission permission25 = new Permission(null, "CRUD_META_GRID_DATA_CREATE");
        Permission permission26 = new Permission(null, "CRUD_META_GRID_DATA_DELETE");
        Permission permission27 = new Permission(null, "META_DATA_PROPERTY_BINDING_PARAMETER_READ");
        Permission permission28 = new Permission(null, "META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE");
        Permission permission29 = new Permission(null, "META_DATA_PROPERTY_BINDING_PARAMETER_CREATE");
        Permission permission30 = new Permission(null, "META_DATA_PROPERTY_BINDING_PARAMETER_DELETE");
        Permission permission31 = new Permission(null, "CUSTOMER_READ");
        Permission permission32 = new Permission(null, "CUSTOMER_UPDATE");
        Permission permission33 = new Permission(null, "CUSTOMER_CREATE");
        Permission permission34 = new Permission(null, "CUSTOMER_DELETE");
        Permission permission35 = new Permission(null, "CUSTOMER_CONTACT_READ");
        Permission permission36 = new Permission(null, "CUSTOMER_CONTACT_UPDATE");
        Permission permission37 = new Permission(null, "CUSTOMER_CONTACT_CREATE");
        Permission permission38 = new Permission(null, "CUSTOMER_CONTACT_DELETE");
        Permission permission39 = new Permission(null, "DASHBOARD_READ");
        Permission permission40 = new Permission(null, "DASHBOARD_UPDATE");
        Permission permission41 = new Permission(null, "DASHBOARD_CREATE");
        Permission permission42 = new Permission(null, "DASHBOARD_DELETE");
        Permission permission43 = new Permission(null, "DASHBOARD_BOX_READ");
        Permission permission44 = new Permission(null, "DASHBOARD_BOX_UPDATE");
        Permission permission45 = new Permission(null, "DASHBOARD_BOX_CREATE");
        Permission permission46 = new Permission(null, "DASHBOARD_BOX_DELETE");
        Permission permission47 = new Permission(null, "DASHBOARD_BOX_TYPE_READ");
        Permission permission48 = new Permission(null, "DASHBOARD_BOX_TYPE_UPDATE");
        Permission permission49 = new Permission(null, "DASHBOARD_BOX_TYPE_CREATE");
        Permission permission50 = new Permission(null, "DASHBOARD_BOX_TYPE_DELETE");
        Role role_user = new Role(null, "ROLE_USER");
        Role role_admin = new Role(null, "ROLE_ADMIN");
        User user = new User(null,"user","password","userName","userSurname","user@gmail.com",true,false);
        User admin = new User(null,"admin","admin","adminName","adminSurname","admin@gmail.com",true,false);
        permissionRepository.save(permission1);
        permissionRepository.save(permission2);
        permissionRepository.save(permission3);
        permissionRepository.save(permission4);
        permissionRepository.save(permission5);
        permissionRepository.save(permission6);
        permissionRepository.save(permission7);
        permissionRepository.save(permission8);
        permissionRepository.save(permission9);
        permissionRepository.save(permission10);
        permissionRepository.save(permission11);
        permissionRepository.save(permission12);
        permissionRepository.save(permission13);
        permissionRepository.save(permission14);
        permissionRepository.save(permission15);
        permissionRepository.save(permission16);
        permissionRepository.save(permission17);
        permissionRepository.save(permission18);
        permissionRepository.save(permission19);
        permissionRepository.save(permission20);
        permissionRepository.save(permission21);
        permissionRepository.save(permission22);
        permissionRepository.save(permission23);
        permissionRepository.save(permission24);
        permissionRepository.save(permission25);
        permissionRepository.save(permission26);
        permissionRepository.save(permission27);
        permissionRepository.save(permission28);
        permissionRepository.save(permission29);
        permissionRepository.save(permission30);
        permissionRepository.save(permission31);
        permissionRepository.save(permission32);
        permissionRepository.save(permission33);
        permissionRepository.save(permission34);
        permissionRepository.save(permission35);
        permissionRepository.save(permission36);
        permissionRepository.save(permission37);
        permissionRepository.save(permission38);
        permissionRepository.save(permission39);
        permissionRepository.save(permission40);
        permissionRepository.save(permission41);
        permissionRepository.save(permission42);
        permissionRepository.save(permission43);
        permissionRepository.save(permission44);
        permissionRepository.save(permission45);
        permissionRepository.save(permission46);
        permissionRepository.save(permission47);
        permissionRepository.save(permission48);
        permissionRepository.save(permission49);
        permissionRepository.save(permission50);
        Set<Permission> userPermission = new HashSet<>();
        userPermission.add(permissionRepository.findOne(5L));
        userPermission.add(permissionRepository.findOne(6L));
        role_user.setPermissions(userPermission);
        role_admin.setPermissions(new HashSet<>(permissionRepository.findAll()));
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
