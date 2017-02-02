package io.smsc.config;

import org.hibernate.dialect.Oracle10gDialect;

import java.sql.Types;

/**
 * This class is extending base {@link Oracle10gDialect} class to
 * register a double data type as float column type.
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public class Oracle10gDialectExtended extends Oracle10gDialect {

    public Oracle10gDialectExtended() {
        super();
        registerColumnType(Types.DOUBLE, "float");
    }
}
