package db.migration;

import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

public class V2__Create_user implements SpringJdbcMigration {

    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {
//        jdbcTemplate.execute("INSERT INTO USERS (id, username, password, first_name, surName, email) VALUES (10, 'FirstUser', 'password', 'firstUserName', 'firstUserSurname', 'first_user@gmail.com')");
    jdbcTemplate.execute("INSERT INTO PERMISSIONS (id, name) VALUES (10, 'PERMISSION_WITHOUT_PERMISSIONS')");
    }
}
