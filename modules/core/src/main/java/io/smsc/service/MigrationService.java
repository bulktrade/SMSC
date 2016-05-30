package io.smsc.service;

import org.springframework.stereotype.Service;

@Service
public interface MigrationService {
    void upgradeDatabase();
}
