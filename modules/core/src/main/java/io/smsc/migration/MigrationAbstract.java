package io.smsc.migration;

import io.smsc.service.MigrationService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class MigrationAbstract {
    @Autowired
    protected MigrationService migrationService;
}
