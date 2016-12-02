package io.smsc.db.migration;

import io.smsc.model.Permission;
import io.smsc.model.Role;
import io.smsc.model.User;
import io.smsc.model.crud.*;
import io.smsc.repository.crud.crudClassMetaData.CrudClassMetaDataRepository;
import io.smsc.repository.crud.crudMetaFormData.CrudMetaFormDataRepository;
import io.smsc.repository.crud.crudMetaGridData.CrudMetaGridDataRepository;
import io.smsc.repository.crud.metaDataPropertyBindingParameter.MetaDataPropertyBindingParameterRepository;
import io.smsc.repository.permission.PermissionRepository;
import io.smsc.repository.role.RoleRepository;
import io.smsc.repository.user.UserRepository;
import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class V1_2__populateDB implements SpringJdbcMigration {

    private final RoleRepository roleRepository;

    private final PermissionRepository permissionRepository;

    private final UserRepository userRepository;

    private final CrudClassMetaDataRepository crudClassMetaDataRepository;

    private final CrudMetaFormDataRepository crudMetaFormDataRepository;

    private final CrudMetaGridDataRepository crudMetaGridDataRepository;

    private final MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository;

    @Autowired
    public V1_2__populateDB(RoleRepository roleRepository, PermissionRepository permissionRepository, UserRepository userRepository,
                            CrudClassMetaDataRepository crudClassMetaDataRepository, CrudMetaFormDataRepository crudMetaFormDataRepository,
                            CrudMetaGridDataRepository crudMetaGridDataRepository, MetaDataPropertyBindingParameterRepository metaDataPropertyBindingParameterRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
        this.crudClassMetaDataRepository = crudClassMetaDataRepository;
        this.crudMetaFormDataRepository = crudMetaFormDataRepository;
        this.crudMetaGridDataRepository = crudMetaGridDataRepository;
        this.metaDataPropertyBindingParameterRepository = metaDataPropertyBindingParameterRepository;
    }

    public void migrate(JdbcTemplate jdbcTemplate) {
        User user = new User(1L,"User","password","userName","userSurname","user@gmail.com",true,false);
        User admin = new User(2L,"Admin","admin","adminName","adminSurname","admin@gmail.com",true,false);
        Role role_user = new Role(3L, "ROLE_USER");
        Role role_admin = new Role(3L, "ROLE_ADMIN");
        Permission permission1 = new Permission(5L, "READ_USER");
        Permission permission2 = new Permission(6L, "UPDATE_USER");
        Permission permission3 = new Permission(7L, "CREATE_USER");
        Permission permission4 = new Permission(8L, "DELETE_USER");
        Permission permission5 = new Permission(9L, "READ_OWN_USER");
        Permission permission6 = new Permission(10L, "UPDATE_OWN_USER");
        role_user.addPermission(permission5);
        role_user.addPermission(permission6);
        role_admin.addPermission(permission1);
        role_admin.addPermission(permission2);
        role_admin.addPermission(permission3);
        role_admin.addPermission(permission4);
        role_admin.addPermission(permission5);
        role_admin.addPermission(permission6);
        user.addRole(role_user);
        admin.addRole(role_admin);
        permissionRepository.save(permission1);
        permissionRepository.save(permission2);
        permissionRepository.save(permission3);
        permissionRepository.save(permission4);
        permissionRepository.save(permission5);
        permissionRepository.save(permission6);
        roleRepository.save(role_user);
        roleRepository.save(role_admin);
        userRepository.saveOneWithEncryptedPassword(user);
        userRepository.saveOneWithEncryptedPassword(admin);
        CrudClassMetaData crudClassMetaData1 = new CrudClassMetaData(11L, "CrudMetaGridData", "columnWidth", true, null);
        CrudClassMetaData crudClassMetaData2 = new CrudClassMetaData(12L, "CrudMetaFormData", "fieldLayoutGridPosition", true, null);
        CrudClassMetaData crudClassMetaData3 = new CrudClassMetaData(13L, "CrudClassMetaData", "class", true, null);
        CrudClassMetaData crudClassMetaData4 = new CrudClassMetaData(14L, "MetaDataPropertyBindingParameter", "operator", true, null);
        crudClassMetaDataRepository.save(crudClassMetaData1);
        crudClassMetaDataRepository.save(crudClassMetaData2);
        crudClassMetaDataRepository.save(crudClassMetaData3);
        crudClassMetaDataRepository.save(crudClassMetaData4);
        CrudMetaGridData crudMetaGridData1 = new CrudMetaGridData(15L, "fromProperty", true, true, null, 1.0, null);
        CrudMetaGridData crudMetaGridData2 = new CrudMetaGridData(16L, "toProperty", true, true, null, 2.0, null);
        CrudMetaGridData crudMetaGridData3 = new CrudMetaGridData(17L, "combineOperator", true, true, null, 3.0, null);
        CrudMetaGridData crudMetaGridData4 = new CrudMetaGridData(18L, "operator", true, true, null, 4.0, null);
        CrudMetaGridData crudMetaGridData5 = new CrudMetaGridData(19L, "columnWidth", true, true, null, 1.0, null);
        CrudMetaGridData crudMetaGridData6 = new CrudMetaGridData(20L, "property", true, true, null, 2.0, null);
        CrudMetaGridData crudMetaGridData7 = new CrudMetaGridData(21L, "editable", true, true, null, 3.0, null);
        CrudMetaGridData crudMetaGridData8 = new CrudMetaGridData(21L, "visible", true, true, null, 4.0, null);
        CrudMetaGridData crudMetaGridData9 = new CrudMetaGridData(23L, "decorator", true, true, null, 5.0, null);
        CrudMetaGridData crudMetaGridData10 = new CrudMetaGridData(24L, "order", true, true, null, 6.0, null);
        CrudMetaGridData crudMetaGridData11 = new CrudMetaGridData(25L, "crudClassMetaData", true, true, null, 7.0, null);
        CrudMetaGridData crudMetaGridData12 = new CrudMetaGridData(26L, "bingingProperties", true, true, null, 8.0, null);
        CrudMetaGridData crudMetaGridData13 = new CrudMetaGridData(27L, "fieldLayoutGridPosition", true, true, null, 1.0, null);
        CrudMetaGridData crudMetaGridData14 = new CrudMetaGridData(28L, "property", true, true, null, 2.0, null);
        CrudMetaGridData crudMetaGridData15 = new CrudMetaGridData(29L, "editable", true, true, null, 3.0, null);
        CrudMetaGridData crudMetaGridData16 = new CrudMetaGridData(30L, "visible", true, true, null, 4.0, null);
        CrudMetaGridData crudMetaGridData17 = new CrudMetaGridData(31L, "decorator", true, true, null, 5.0, null);
        CrudMetaGridData crudMetaGridData18 = new CrudMetaGridData(32L, "order", true, true, null, 6.0, null);
        CrudMetaGridData crudMetaGridData19 = new CrudMetaGridData(33L, "crudClassMetaData", true, true, null, 7.0, null);
        CrudMetaGridData crudMetaGridData20 = new CrudMetaGridData(34L, "bingingProperties", true, true, null, 8.0, null);
        crudMetaGridData1.setCrudClassMetaData(crudClassMetaData4);
        crudMetaGridData2.setCrudClassMetaData(crudClassMetaData4);
        crudMetaGridData3.setCrudClassMetaData(crudClassMetaData4);
        crudMetaGridData4.setCrudClassMetaData(crudClassMetaData4);
        crudMetaGridData5.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData6.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData7.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData8.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData9.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData10.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData11.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData12.setCrudClassMetaData(crudClassMetaData1);
        crudMetaGridData13.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData14.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData15.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData16.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData17.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData18.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData19.setCrudClassMetaData(crudClassMetaData2);
        crudMetaGridData20.setCrudClassMetaData(crudClassMetaData2);
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
        CrudMetaFormData crudMetaFormData1 = new CrudMetaFormData(35L, "fromProperty", true, true, null, 1.0, null);
        CrudMetaFormData crudMetaFormData2 = new CrudMetaFormData(36L, "toProperty", true, true, null, 2.0, null);
        CrudMetaFormData crudMetaFormData3 = new CrudMetaFormData(37L, "combineOperator", true, true, null, 3.0, null);
        CrudMetaFormData crudMetaFormData4 = new CrudMetaFormData(38L, "operator", true, true, null, 4.0, null);
        CrudMetaFormData crudMetaFormData5 = new CrudMetaFormData(39L, "columnWidth", true, true, null, 1.0, null);
        CrudMetaFormData crudMetaFormData6 = new CrudMetaFormData(40L, "property", true, true, null, 2.0, null);
        CrudMetaFormData crudMetaFormData7 = new CrudMetaFormData(41L, "editable", true, true, null, 3.0, null);
        CrudMetaFormData crudMetaFormData8 = new CrudMetaFormData(42L, "visible", true, true, null, 4.0, null);
        CrudMetaFormData crudMetaFormData9 = new CrudMetaFormData(43L, "decorator", true, true, null, 5.0, null);
        CrudMetaFormData crudMetaFormData10 = new CrudMetaFormData(44L, "order", true, true, null, 6.0, null);
        CrudMetaFormData crudMetaFormData11 = new CrudMetaFormData(45L, "crudClassMetaData", true, true, null, 7.0, null);
        CrudMetaFormData crudMetaFormData12 = new CrudMetaFormData(46L, "bingingProperties", true, true, null, 8.0, null);
        CrudMetaFormData crudMetaFormData13 = new CrudMetaFormData(47L, "fieldLayoutGridPosition", true, true, null, 1.0, null);
        CrudMetaFormData crudMetaFormData14 = new CrudMetaFormData(48L, "property", true, true, null, 2.0, null);
        CrudMetaFormData crudMetaFormData15 = new CrudMetaFormData(49L, "editable", true, true, null, 3.0, null);
        CrudMetaFormData crudMetaFormData16 = new CrudMetaFormData(50L, "visible", true, true, null, 4.0, null);
        CrudMetaFormData crudMetaFormData17 = new CrudMetaFormData(51L, "decorator", true, true, null, 5.0, null);
        CrudMetaFormData crudMetaFormData18 = new CrudMetaFormData(52L, "order", true, true, null, 6.0, null);
        CrudMetaFormData crudMetaFormData19 = new CrudMetaFormData(53L, "crudClassMetaData", true, true, null, 7.0, null);
        CrudMetaFormData crudMetaFormData20 = new CrudMetaFormData(54L, "bingingProperties", true, true, null, 8.0, null);
        crudMetaFormData1.setCrudClassMetaData(crudClassMetaData4);
        crudMetaFormData2.setCrudClassMetaData(crudClassMetaData4);
        crudMetaFormData3.setCrudClassMetaData(crudClassMetaData4);
        crudMetaFormData4.setCrudClassMetaData(crudClassMetaData4);
        crudMetaFormData5.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData6.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData7.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData8.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData9.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData10.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData11.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData12.setCrudClassMetaData(crudClassMetaData1);
        crudMetaFormData13.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData14.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData15.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData16.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData17.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData18.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData19.setCrudClassMetaData(crudClassMetaData2);
        crudMetaFormData20.setCrudClassMetaData(crudClassMetaData2);
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
        MetaDataPropertyBindingParameter metaDataPropertyBindingParameter = new MetaDataPropertyBindingParameter(55L, "customer", "@rid");
        metaDataPropertyBindingParameter.addCombineOperator(CombineOperator.OR);
        metaDataPropertyBindingParameter.addOperator(Operator.EQUALS);
        metaDataPropertyBindingParameterRepository.save(metaDataPropertyBindingParameter);
    }
}
