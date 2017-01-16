package io.smsc.db.migration;

import io.smsc.converters.CryptoConverter;
import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.crud.*;
import io.smsc.model.customer.Customer;
import io.smsc.model.customer.CustomerContact;
import io.smsc.model.customer.Salutation;
import io.smsc.model.customer.Type;
import io.smsc.model.dashboard.*;
import io.smsc.repository.crud.crudClassMetaData.CrudClassMetaDataRepository;
import io.smsc.repository.crud.crudMetaFormData.CrudMetaFormDataRepository;
import io.smsc.repository.crud.crudMetaGridData.CrudMetaGridDataRepository;
import io.smsc.repository.crud.metaDataPropertyBindingParameter.MetaDataPropertyBindingParameterRepository;
import io.smsc.repository.customer.customer.CustomerMigrationRepository;
import io.smsc.repository.customer.customerContact.CustomerContactRepository;
import io.smsc.repository.dashboard.dashboard.DashboardRepository;
import io.smsc.repository.dashboard.dashboardBox.DashboardBoxRepository;
import io.smsc.repository.dashboard.dashboardBoxType.DashboardBoxTypeRepository;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserMigrationRepository;
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

    private final UserMigrationRepository userRepository;

    private final CrudClassMetaDataRepository crudClassMetaDataRepository;

    private final CrudMetaFormDataRepository crudMetaFormDataRepository;

    private final CrudMetaGridDataRepository crudMetaGridDataRepository;

    private final MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    private final CustomerMigrationRepository customerRepository;

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
    public V1_2__populateDB(PermissionRepository permissionRepository, RoleRepository roleRepository, UserMigrationRepository userRepository,
                            CrudClassMetaDataRepository crudClassMetaDataRepository, CrudMetaFormDataRepository crudMetaFormDataRepository,
                            CrudMetaGridDataRepository crudMetaGridDataRepository, MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository,
                            CustomerMigrationRepository customerRepository, CustomerContactRepository customerContactRepository, DashboardRepository dashboardRepository,
                            DashboardBoxRepository dashboardBoxRepository, DashboardBoxTypeRepository dashboardBoxTypeRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.crudClassMetaDataRepository = crudClassMetaDataRepository;
        this.crudMetaFormDataRepository = crudMetaFormDataRepository;
        this.crudMetaGridDataRepository = crudMetaGridDataRepository;
        this.metaDataPropertyBindingParameterRepository = metaDataPropertyBindingParameterRepository;
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
        Permission permission1 = new Permission(1L, "USER_READ");
        Permission permission2 = new Permission(2L, "USER_UPDATE");
        Permission permission3 = new Permission(3L, "USER_CREATE");
        Permission permission4 = new Permission(4L, "USER_DELETE");
        Permission permission5 = new Permission(5L, "USER_READ_OWN");
        Permission permission6 = new Permission(6L, "USER_UPDATE_OWN");
        Permission permission7 = new Permission(7L, "ROLE_READ");
        Permission permission8 = new Permission(8L, "ROLE_UPDATE");
        Permission permission9 = new Permission(9L, "ROLE_CREATE");
        Permission permission10 = new Permission(10L, "ROLE_DELETE");
        Permission permission11 = new Permission(11L, "PERMISSION_READ");
        Permission permission12 = new Permission(12L, "PERMISSION_UPDATE");
        Permission permission13 = new Permission(13L, "PERMISSION_CREATE");
        Permission permission14 = new Permission(14L, "PERMISSION_DELETE");
        Permission permission15 = new Permission(15L, "CRUD_CLASS_META_DATA_READ");
        Permission permission16 = new Permission(16L, "CRUD_CLASS_META_DATA_UPDATE");
        Permission permission17 = new Permission(17L, "CRUD_CLASS_META_DATA_CREATE");
        Permission permission18 = new Permission(18L, "CRUD_CLASS_META_DATA_DELETE");
        Permission permission19 = new Permission(19L, "CRUD_META_FORM_DATA_READ");
        Permission permission20 = new Permission(20L, "CRUD_META_FORM_DATA_UPDATE");
        Permission permission21 = new Permission(21L, "CRUD_META_FORM_DATA_CREATE");
        Permission permission22 = new Permission(22L, "CRUD_META_FORM_DATA_DELETE");
        Permission permission23 = new Permission(23L, "CRUD_META_GRID_DATA_READ");
        Permission permission24 = new Permission(24L, "CRUD_META_GRID_DATA_UPDATE");
        Permission permission25 = new Permission(25L, "CRUD_META_GRID_DATA_CREATE");
        Permission permission26 = new Permission(26L, "CRUD_META_GRID_DATA_DELETE");
        Permission permission27 = new Permission(27L, "META_DATA_PROPERTY_BINDING_PARAMETER_READ");
        Permission permission28 = new Permission(28L, "META_DATA_PROPERTY_BINDING_PARAMETER_UPDATE");
        Permission permission29 = new Permission(29L, "META_DATA_PROPERTY_BINDING_PARAMETER_CREATE");
        Permission permission30 = new Permission(30L, "META_DATA_PROPERTY_BINDING_PARAMETER_DELETE");
        Permission permission31 = new Permission(31L, "CUSTOMER_READ");
        Permission permission32 = new Permission(32L, "CUSTOMER_UPDATE");
        Permission permission33 = new Permission(33L, "CUSTOMER_CREATE");
        Permission permission34 = new Permission(34L, "CUSTOMER_DELETE");
        Permission permission35 = new Permission(35L, "CUSTOMER_CONTACT_READ");
        Permission permission36 = new Permission(36L, "CUSTOMER_CONTACT_UPDATE");
        Permission permission37 = new Permission(37L, "CUSTOMER_CONTACT_CREATE");
        Permission permission38 = new Permission(38L, "CUSTOMER_CONTACT_DELETE");
        Permission permission39 = new Permission(39L, "DASHBOARD_READ");
        Permission permission40 = new Permission(40L, "DASHBOARD_UPDATE");
        Permission permission41 = new Permission(41L, "DASHBOARD_CREATE");
        Permission permission42 = new Permission(42L, "DASHBOARD_DELETE");
        Permission permission43 = new Permission(43L, "DASHBOARD_BOX_READ");
        Permission permission44 = new Permission(44L, "DASHBOARD_BOX_UPDATE");
        Permission permission45 = new Permission(45L, "DASHBOARD_BOX_CREATE");
        Permission permission46 = new Permission(46L, "DASHBOARD_BOX_DELETE");
        Permission permission47 = new Permission(47L, "DASHBOARD_BOX_TYPE_READ");
        Permission permission48 = new Permission(48L, "DASHBOARD_BOX_TYPE_UPDATE");
        Permission permission49 = new Permission(49L, "DASHBOARD_BOX_TYPE_CREATE");
        Permission permission50 = new Permission(50L, "DASHBOARD_BOX_TYPE_DELETE");
        Role role_user = new Role(51L, "ROLE_USER");
        Role role_admin = new Role(52L, "ROLE_ADMIN");
        User user = new User(53L,"User","password","userName","userSurname","user@gmail.com",true,false);
        User admin = new User(54L,"Admin","admin","adminName","adminSurname","admin@gmail.com",true,false);
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
        CrudClassMetaData crudClassMetaData1 = new CrudClassMetaData(55L, "CrudMetaGridData", "columnWidth", true, null);
        CrudClassMetaData crudClassMetaData2 = new CrudClassMetaData(56L, "CrudMetaFormData", "fieldLayoutGridPosition", true, null);
        CrudClassMetaData crudClassMetaData3 = new CrudClassMetaData(57L, "CrudClassMetaData", "class", true, null);
        CrudClassMetaData crudClassMetaData4 = new CrudClassMetaData(58L, "Customer", "customerId", true, null);
        CrudClassMetaData crudClassMetaData5 = new CrudClassMetaData(59L,"User", "name", true, null);
        CrudClassMetaData crudClassMetaData6 = new CrudClassMetaData(60L,"MetaDataPropertyBindingParameter", "operator", true, null);
        CrudClassMetaData crudClassMetaData7 = new CrudClassMetaData(61L,"Dashboard", "name", true, null);
        CrudClassMetaData crudClassMetaData8 = new CrudClassMetaData(62L,"DashboardBox", "name", true, null);
        CrudClassMetaData crudClassMetaData9 = new CrudClassMetaData(63L,"DashboardBoxType", "name", true, null);
        CrudClassMetaData newCrudClassMetaData1 = crudClassMetaDataRepository.save(crudClassMetaData1);
        CrudClassMetaData newCrudClassMetaData2 = crudClassMetaDataRepository.save(crudClassMetaData2);
        CrudClassMetaData newCrudClassMetaData3 = crudClassMetaDataRepository.save(crudClassMetaData3);
        CrudClassMetaData newCrudClassMetaData4 = crudClassMetaDataRepository.save(crudClassMetaData4);
        CrudClassMetaData newCrudClassMetaData5 = crudClassMetaDataRepository.save(crudClassMetaData5);
        CrudClassMetaData newCrudClassMetaData6 = crudClassMetaDataRepository.save(crudClassMetaData6);
        CrudClassMetaData newCrudClassMetaData7 = crudClassMetaDataRepository.save(crudClassMetaData7);
        CrudClassMetaData newCrudClassMetaData8 = crudClassMetaDataRepository.save(crudClassMetaData8);
        CrudClassMetaData newCrudClassMetaData9 = crudClassMetaDataRepository.save(crudClassMetaData9);
        CrudMetaFormData crudMetaFormData1 = new CrudMetaFormData(64L, "fromProperty", true, true, null, 1.0, null, newCrudClassMetaData6);
        CrudMetaFormData crudMetaFormData2 = new CrudMetaFormData(65L, "toProperty", true, true, null, 2.0, null, newCrudClassMetaData6);
        CrudMetaFormData crudMetaFormData3 = new CrudMetaFormData(66L, "combineOperator", true, true, null, 3.0, null, newCrudClassMetaData6);
        CrudMetaFormData crudMetaFormData4 = new CrudMetaFormData(67L, "operator", true, true, null, 4.0, null, newCrudClassMetaData6);
        CrudMetaFormData crudMetaFormData5 = new CrudMetaFormData(68L, "columnWidth", true, true, null, 1.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData6 = new CrudMetaFormData(69L, "property", true, true, null, 2.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData7 = new CrudMetaFormData(70L, "editable", true, true, null, 3.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData8 = new CrudMetaFormData(71L, "visible", true, true, null, 4.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData9 = new CrudMetaFormData(72L, "decorator", true, true, null, 5.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData10 = new CrudMetaFormData(73L, "order", true, true, null, 6.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData11 = new CrudMetaFormData(74L, "crudClassMetaData", true, true, null, 7.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData12 = new CrudMetaFormData(75L, "bindingProperties", true, true, null, 8.0, null, newCrudClassMetaData1);
        CrudMetaFormData crudMetaFormData13 = new CrudMetaFormData(76L, "fieldLayoutGridPosition", true, true, null, 1.0, null,newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData14 = new CrudMetaFormData(77L, "property", true, true, null, 2.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData15 = new CrudMetaFormData(78L, "editable", true, true, null, 3.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData16 = new CrudMetaFormData(79L, "visible", true, true, null, 4.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData17 = new CrudMetaFormData(80L, "decorator", true, true, null, 5.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData18 = new CrudMetaFormData(81L, "order", true, true, null, 6.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData19 = new CrudMetaFormData(82L, "crudClassMetaData", true, true, null, 7.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData20 = new CrudMetaFormData(83L, "bindingProperties", true, true, null, 8.0, null, newCrudClassMetaData2);
        CrudMetaFormData crudMetaFormData21 = new CrudMetaFormData(84L,"customerId", true, true, null, 1.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData22 = new CrudMetaFormData(85L,"companyName", true, true, null, 2.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData23 = new CrudMetaFormData(86L,"street", true, true, null, 3.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData24 = new CrudMetaFormData(87L,"street2", true, true, null, 4.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData25 = new CrudMetaFormData(88L,"postcode", true, true, null,5.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData26 = new CrudMetaFormData(89L,"country", true, true, null, 6.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData27 = new CrudMetaFormData(90L,"city", true, true, null, 7.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData28 = new CrudMetaFormData(91L,"vatid", true, true, null, 8.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData29 = new CrudMetaFormData(92L,"contacts", true, true, null, 9.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData30 = new CrudMetaFormData(93L,"users", true, true, null, 10.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData31 = new CrudMetaFormData(94L,"parentCustomer", true, true, null, 11.0, null, newCrudClassMetaData4);
        CrudMetaFormData crudMetaFormData32 = new CrudMetaFormData(95L,"name", true, true, null, 1.0, null, newCrudClassMetaData7);
        CrudMetaFormData crudMetaFormData33 = new CrudMetaFormData(96L,"name", true, true, null, 1.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData34 = new CrudMetaFormData(97L,"description", true, true, null, 2.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData35 = new CrudMetaFormData(98L,"type", true, true, null, 3.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData36 = new CrudMetaFormData(99L,"dashboard", true, true, null, 4.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData37 = new CrudMetaFormData(100L,"width", true, true, null,5.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData38 = new CrudMetaFormData(101L,"height", true, true, null, 6.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData39 = new CrudMetaFormData(102L,"order", true, true, null, 7.0, null, newCrudClassMetaData8);
        CrudMetaFormData crudMetaFormData40 = new CrudMetaFormData(103L,"name", true, true, null, 1.0, null, newCrudClassMetaData9);
        CrudMetaFormData crudMetaFormData41 = new CrudMetaFormData(104L,"type", true, true, null, 2.0, null, newCrudClassMetaData9);
        CrudMetaFormData crudMetaFormData42 = new CrudMetaFormData(105L,"kind", true, true, null, 3.0, null, newCrudClassMetaData9);
        crudMetaFormDataRepository.save(crudMetaFormData1);
        crudMetaFormDataRepository.save(crudMetaFormData2);
        crudMetaFormDataRepository.save(crudMetaFormData3);
        crudMetaFormDataRepository.save(crudMetaFormData4);
        crudMetaFormDataRepository.save(crudMetaFormData5);
        crudMetaFormDataRepository.save(crudMetaFormData6);
        crudMetaFormDataRepository.save(crudMetaFormData7);
        crudMetaFormDataRepository.save(crudMetaFormData8);
        crudMetaFormDataRepository.save(crudMetaFormData9);
        crudMetaFormDataRepository.save(crudMetaFormData10);
        crudMetaFormDataRepository.save(crudMetaFormData11);
        crudMetaFormDataRepository.save(crudMetaFormData12);
        crudMetaFormDataRepository.save(crudMetaFormData13);
        crudMetaFormDataRepository.save(crudMetaFormData14);
        crudMetaFormDataRepository.save(crudMetaFormData15);
        crudMetaFormDataRepository.save(crudMetaFormData16);
        crudMetaFormDataRepository.save(crudMetaFormData17);
        crudMetaFormDataRepository.save(crudMetaFormData18);
        crudMetaFormDataRepository.save(crudMetaFormData19);
        crudMetaFormDataRepository.save(crudMetaFormData20);
        crudMetaFormDataRepository.save(crudMetaFormData21);
        crudMetaFormDataRepository.save(crudMetaFormData22);
        crudMetaFormDataRepository.save(crudMetaFormData23);
        crudMetaFormDataRepository.save(crudMetaFormData24);
        crudMetaFormDataRepository.save(crudMetaFormData25);
        crudMetaFormDataRepository.save(crudMetaFormData26);
        crudMetaFormDataRepository.save(crudMetaFormData27);
        crudMetaFormDataRepository.save(crudMetaFormData28);
        crudMetaFormDataRepository.save(crudMetaFormData29);
        crudMetaFormDataRepository.save(crudMetaFormData30);
        crudMetaFormDataRepository.save(crudMetaFormData31);
        crudMetaFormDataRepository.save(crudMetaFormData32);
        crudMetaFormDataRepository.save(crudMetaFormData33);
        crudMetaFormDataRepository.save(crudMetaFormData34);
        crudMetaFormDataRepository.save(crudMetaFormData35);
        crudMetaFormDataRepository.save(crudMetaFormData36);
        crudMetaFormDataRepository.save(crudMetaFormData37);
        crudMetaFormDataRepository.save(crudMetaFormData38);
        crudMetaFormDataRepository.save(crudMetaFormData39);
        crudMetaFormDataRepository.save(crudMetaFormData40);
        crudMetaFormDataRepository.save(crudMetaFormData41);
        crudMetaFormDataRepository.save(crudMetaFormData42);
        CrudMetaGridData crudMetaGridData1 = new CrudMetaGridData(106L, "fromProperty", true, true, null, 1.0, null, newCrudClassMetaData6);
        CrudMetaGridData crudMetaGridData2 = new CrudMetaGridData(107L, "toProperty", true, true, null, 2.0, null, newCrudClassMetaData6);
        CrudMetaGridData crudMetaGridData3 = new CrudMetaGridData(108L, "combineOperator", true, true, null, 3.0, null, newCrudClassMetaData6);
        CrudMetaGridData crudMetaGridData4 = new CrudMetaGridData(109L, "operator", true, true, null, 4.0, null, newCrudClassMetaData6);
        CrudMetaGridData crudMetaGridData5 = new CrudMetaGridData(110L, "columnWidth", true, true, null, 1.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData6 = new CrudMetaGridData(111L, "property", true, true, null, 2.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData7 = new CrudMetaGridData(112L, "editable", true, true, null, 3.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData8 = new CrudMetaGridData(113L, "visible", true, true, null, 4.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData9 = new CrudMetaGridData(114L, "decorator", true, true, null, 5.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData10 = new CrudMetaGridData(115L, "order", true, true, null, 6.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData11 = new CrudMetaGridData(116L, "crudClassMetaData", true, true, null, 7.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData12 = new CrudMetaGridData(117L, "bingingProperties", true, true, null, 8.0, null, newCrudClassMetaData1);
        CrudMetaGridData crudMetaGridData13 = new CrudMetaGridData(118L, "fieldLayoutGridPosition", true, true, null, 1.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData14 = new CrudMetaGridData(119L, "property", true, true, null, 2.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData15 = new CrudMetaGridData(120L, "editable", true, true, null, 3.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData16 = new CrudMetaGridData(121L, "visible", true, true, null, 4.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData17 = new CrudMetaGridData(122L, "decorator", true, true, null, 5.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData18 = new CrudMetaGridData(123L, "order", true, true, null, 6.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData19 = new CrudMetaGridData(124L, "crudClassMetaData", true, true, null, 7.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData20 = new CrudMetaGridData(125L, "bingingProperties", true, true, null, 8.0, null, newCrudClassMetaData2);
        CrudMetaGridData crudMetaGridData21 = new CrudMetaGridData(126L,"customerId", true, true, null, 1.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData22 = new CrudMetaGridData(127L,"companyName", true, true, null, 2.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData23 = new CrudMetaGridData(128L,"street", true, true, null, 3.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData24 = new CrudMetaGridData(129L,"street2", true, true, null, 4.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData25 = new CrudMetaGridData(130L,"postcode", true, true, null,5.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData26 = new CrudMetaGridData(131L,"country", true, true, null, 6.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData27 = new CrudMetaGridData(132L,"city", true, true, null, 7.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData28 = new CrudMetaGridData(133L,"vatid", true, true, null, 8.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData29 = new CrudMetaGridData(134L,"contacts", true, true, null, 9.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData30 = new CrudMetaGridData(135L,"users", true, true, null, 10.0, null, newCrudClassMetaData4);
        CrudMetaGridData crudMetaGridData31 = new CrudMetaGridData(136L,"parentCustomer", true, true, null, 11.0, null, newCrudClassMetaData4);
        crudMetaGridDataRepository.save(crudMetaGridData1);
        crudMetaGridDataRepository.save(crudMetaGridData2);
        crudMetaGridDataRepository.save(crudMetaGridData3);
        crudMetaGridDataRepository.save(crudMetaGridData4);
        crudMetaGridDataRepository.save(crudMetaGridData5);
        crudMetaGridDataRepository.save(crudMetaGridData6);
        crudMetaGridDataRepository.save(crudMetaGridData7);
        crudMetaGridDataRepository.save(crudMetaGridData8);
        crudMetaGridDataRepository.save(crudMetaGridData9);
        crudMetaGridDataRepository.save(crudMetaGridData10);
        crudMetaGridDataRepository.save(crudMetaGridData11);
        crudMetaGridDataRepository.save(crudMetaGridData12);
        crudMetaGridDataRepository.save(crudMetaGridData13);
        crudMetaGridDataRepository.save(crudMetaGridData14);
        crudMetaGridDataRepository.save(crudMetaGridData15);
        crudMetaGridDataRepository.save(crudMetaGridData16);
        crudMetaGridDataRepository.save(crudMetaGridData17);
        crudMetaGridDataRepository.save(crudMetaGridData18);
        crudMetaGridDataRepository.save(crudMetaGridData19);
        crudMetaGridDataRepository.save(crudMetaGridData20);
        crudMetaGridDataRepository.save(crudMetaGridData21);
        crudMetaGridDataRepository.save(crudMetaGridData22);
        crudMetaGridDataRepository.save(crudMetaGridData23);
        crudMetaGridDataRepository.save(crudMetaGridData24);
        crudMetaGridDataRepository.save(crudMetaGridData25);
        crudMetaGridDataRepository.save(crudMetaGridData26);
        crudMetaGridDataRepository.save(crudMetaGridData27);
        crudMetaGridDataRepository.save(crudMetaGridData28);
        crudMetaGridDataRepository.save(crudMetaGridData29);
        crudMetaGridDataRepository.save(crudMetaGridData30);
        crudMetaGridDataRepository.save(crudMetaGridData31);
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(137L, "customer", "@rid");
        metaDataPropertyBindingParameter.setCombineOperator(CombineOperator.OR);
        metaDataPropertyBindingParameter.setOperator(Operator.EQUALS);
        metaDataPropertyBindingParameterRepository.save(metaDataPropertyBindingParameter);
        Customer customer = new Customer(138L, 1.0, "SMSC", "Amtsgericht", "Amtsgericht", "3254", "Germany", "Stuttgart", 5672394.0);
        Set<User> users = new HashSet<>(userRepository.findAllDistinctByOrderById());
        customer.setUsers(users);
        Customer newCustomer = customerRepository.save(customer);
        CustomerContact customerContact = new CustomerContact(139L, "SMSC", "SMSC", "0674329568", "0504569753", "fake_fax", "smsc@bulk.io", Type.CEO, Salutation.MR);
        customerContact.setCustomer(newCustomer);
        customerContactRepository.save(customerContact);
        Dashboard dashboard = new Dashboard(140L, "default", "user", new_user);
        Dashboard newDashboard = dashboardRepository.save(dashboard);
        DashboardBoxType dashboardBoxType1 = new DashboardBoxType(141L, "Ivan feeds", io.smsc.model.dashboard.Type.STATUS, Kind.FEEDBACK_STATUS);
        DashboardBoxType dashboardBoxType2 = new DashboardBoxType(142L, "Petia profit", io.smsc.model.dashboard.Type.CHART, Kind.PIE_CHART);
        DashboardBoxType dashboardBoxType3 = new DashboardBoxType(143L, "Rusia chart profit", io.smsc.model.dashboard.Type.CHART, Kind.SERIAL_CHART);
        DashboardBoxType dashboardBoxType4 = new DashboardBoxType(144L, "Ivan chart profit", io.smsc.model.dashboard.Type.CHART, Kind.LINE_CHART);
        DashboardBoxType dashboardBoxType5 = new DashboardBoxType(145L, "Kolia chart profit", io.smsc.model.dashboard.Type.CHART, Kind.BAR_CHART);
        DashboardBoxType dashboardBoxType6 = new DashboardBoxType(146L, "Masha bubble chartat", io.smsc.model.dashboard.Type.CHART, Kind.BUBBLE_CHART);
        DashboardBoxType newDashboardBoxType1 = dashboardBoxTypeRepository.save(dashboardBoxType1);
        DashboardBoxType newDashboardBoxType2 = dashboardBoxTypeRepository.save(dashboardBoxType2);
        DashboardBoxType newDashboardBoxType3 = dashboardBoxTypeRepository.save(dashboardBoxType3);
        DashboardBoxType newDashboardBoxType4 = dashboardBoxTypeRepository.save(dashboardBoxType4);
        DashboardBoxType newDashboardBoxType5 = dashboardBoxTypeRepository.save(dashboardBoxType5);
        DashboardBoxType newDashboardBoxType6 = dashboardBoxTypeRepository.save(dashboardBoxType6);
        DashboardBox dashboardBox1 = new DashboardBox(147L, Width.WIDTH_25, Height.HEIGHT_25, 1, "Box 1", "Box 1 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox2 = new DashboardBox(148L, Width.WIDTH_25, Height.HEIGHT_25, 2, "Box 2", "Box 2 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox3 = new DashboardBox(149L, Width.WIDTH_25, Height.HEIGHT_25, 3, "Box 3", "Box 3 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox4 = new DashboardBox(150L, Width.WIDTH_25, Height.HEIGHT_25, 4, "Box 4", "Box 4 desc", newDashboard, newDashboardBoxType1);
        DashboardBox dashboardBox5 = new DashboardBox(151L, Width.WIDTH_50, Height.HEIGHT_50, 5, "Box 5", "Box 5 desc", newDashboard, newDashboardBoxType2);
        DashboardBox dashboardBox6 = new DashboardBox(152L, Width.WIDTH_50, Height.HEIGHT_50, 6, "Box 6", "Box 6 desc", newDashboard, newDashboardBoxType3);
        DashboardBox dashboardBox7 = new DashboardBox(153L, Width.WIDTH_50, Height.HEIGHT_50, 7, "Box 7", "Box 7 desc", newDashboard, newDashboardBoxType4);
        DashboardBox dashboardBox8 = new DashboardBox(154L, Width.WIDTH_50, Height.HEIGHT_50, 8, "Box 8", "Box 8 desc", newDashboard, newDashboardBoxType5);
        DashboardBox dashboardBox9 = new DashboardBox(155L, Width.WIDTH_50, Height.HEIGHT_50, 9, "Box 9", "Box 9 desc", newDashboard, newDashboardBoxType6);
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
