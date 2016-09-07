let OUserRID = SELECT @rid FROM OUser WHERE name = 'admin';
let Dashboard = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'Dashboard';

if ($DashboardBox.size() == 0) {
  console.log "Dashboard class not exists! Start creating process."

  CREATE Class Dashboard
  CREATE PROPERTY Dashboard.name STRING
  CREATE PROPERTY Dashboard.icon STRING
  CREATE PROPERTY Dashboard.user LINK OUser

  ALTER PROPERTY Dashboard.name MANDATORY true
  ALTER PROPERTY Dashboard.icon MANDATORY true
  ALTER PROPERTY Dashboard.icon MANDATORY true

  CREATE INDEX Dashboard.name UNIQUE
  CREATE INDEX Dashboard.user UNIQUE

  let defaultDashboard = INSERT INTO Dashboard SET name = 'default', icon = 'user', user = $OUserRID

  console.log "Creating process for Dashboard class is done."

  let DashboardBoxType = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'DashboardBoxType';

  if (DashboardBoxType.size() == 0) {
    console.log "DashboardBoxType class not exists! Start creating process."

    //  Create unique index for name
    CREATE Class DashboardBoxType

    CREATE PROPERTY DashboardBoxType.name STRING
    CREATE PROPERTY DashboardBoxType.code STRING
    CREATE PROPERTY DashboardBoxType.codeLanguage STRING

    ALTER PROPERTY DashboardBoxType.name MANDATORY true
    ALTER PROPERTY DashboardBoxType.code MANDATORY true
    ALTER PROPERTY DashboardBoxType.codeLanguage CUSTOM type='SQL,JavaScript'

    CREATE INDEX Dashboard.name UNIQUE

    INSERT INTO DashboardBoxType SET name = 'status', code = '', codeLanguage = 'SQL'
    INSERT INTO DashboardBoxType SET name = 'chart', code = '', codeLanguage = 'SQL'

    console.log "Creating process for DashboardBoxType class is done."
  }

  let DashboardBox = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'DashboardBox';

  if ($DashboardBox.size() == 0) {
    console.log "DashboardBox class not exists! Start creating process."

    CREATE Class DashboardBox
    CREATE PROPERTY DashboardBox.size INTEGER
    CREATE PROPERTY DashboardBox.order INTEGER
    CREATE PROPERTY DashboardBox.name STRING
    CREATE PROPERTY DashboardBox.description STRING
    CREATE PROPERTY DashboardBox.dashboard LINK Dashboard
    CREATE PROPERTY DashboardBox.type LINK DashboardBoxType

    ALTER PROPERTY DashboardBox.size MANDATORY true
    ALTER PROPERTY DashboardBox.order MANDATORY true
    ALTER PROPERTY DashboardBox.name MANDATORY true
    ALTER PROPERTY DashboardBox.description MANDATORY true
    ALTER PROPERTY DashboardBox.dashboard MANDATORY true
    ALTER PROPERTY DashboardBox.type MANDATORY true

    INSERT INTO DashboardBox SET size = 0, order = 0, dashboard = $defaultDashboard['@rid']

    console.log "Creating process for DashboardBox class is done."
  }
}

return true
