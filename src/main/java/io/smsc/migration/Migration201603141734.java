package io.smsc.migration;

import com.orientechnologies.orient.object.db.OObjectDatabaseTx;

/**
 * Created by deacix on 14.03.16.
 */
public class Migration201603141734 extends MigrationAbstract {
    public void run() {
        OObjectDatabaseTx db = new OObjectDatabaseTx("remote:localhost/petshop").open("admin", "admin");

    }
}
