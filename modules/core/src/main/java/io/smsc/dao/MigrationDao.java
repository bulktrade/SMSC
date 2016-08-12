package io.smsc.dao;

import org.springframework.stereotype.Repository;

import java.sql.SQLException;

@Repository
public interface MigrationDao {
    void upgradeDatabase(String sql) throws Exception;
}
