let OUserRID = SELECT * FROM OUser WHERE name = 'admin';
let Dashboard = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'Dashboard';

if ($Dashboard.size() == 0) {
  console.log "Dashboard class not exists! Start creating process."

  CREATE Class Dashboard
  CREATE PROPERTY Dashboard.name STRING
  CREATE PROPERTY Dashboard.icon STRING
  CREATE PROPERTY Dashboard.user LINK OUser

  ALTER PROPERTY Dashboard.name MANDATORY true
  ALTER PROPERTY Dashboard.icon MANDATORY true
  ALTER PROPERTY Dashboard.user MANDATORY true

  CREATE INDEX UNIQUE_NAME_USER ON Dashboard (name, user) UNIQUE

  let defaultDashboard = INSERT INTO Dashboard SET name = 'default', icon = 'user', user = $OUserRID['@rid'][0]

  console.log "Creating process for Dashboard class is done."

  let DashboardBoxType = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'DashboardBoxType';

  if ($DashboardBoxType.size() == 0) {
    console.log "DashboardBoxType class not exists! Start creating process."

    CREATE Class DashboardBoxType EXTENDS OTriggered

      console.log "Create functions"

      CREATE FUNCTION DashboardBoxTypeFunction "var boxTypeRid = doc.field('@rid'); boxTypeRid = String(boxTypeRid); var functionName = boxTypeRid.replace(/#/g, ''); functionName = functionName.replace(/:/g, '_'); functionName = 'DashboardBoxTypeFunction_' + functionName; db.executeCommand('DELETE FROM OFunction WHERE name = \"'+ functionName +'\"'); code = doc.field('code'); if (code != '') { code = code.replace(/'/g, \"\\'\"); code = code.replace(/\"/g, '\\\\\"'); db.executeCommand('CREATE FUNCTION '+ functionName +' \"'+ code +'\" IDEMPOTENT true LANGUAGE JavaScript'); db.executeCommand('UPDATE DashboardBoxType SET onAfterUpdate = \"'+ functionName +'\" WHERE @rid = '+ boxTypeRid); print('Update'); }" LANGUAGE Javascript

      ALTER CLASS DashboardBoxType CUSTOM onAfterCreate = DashboardBoxTypeFunction;
      ALTER CLASS DashboardBoxType CUSTOM onAfterUpdate = DashboardBoxTypeFunction;

      console.log "End create functions"

    CREATE PROPERTY DashboardBoxType.name STRING
    CREATE PROPERTY DashboardBoxType.type STRING
    CREATE PROPERTY DashboardBoxType.kind STRING
    CREATE PROPERTY DashboardBoxType.codeLanguage STRING
    CREATE PROPERTY DashboardBoxType.code STRING

    ALTER PROPERTY DashboardBoxType.name MANDATORY true
    ALTER PROPERTY DashboardBoxType.type MANDATORY true
    ALTER PROPERTY DashboardBoxType.type CUSTOM type='status,chart'
    ALTER PROPERTY DashboardBoxType.kind MANDATORY true
    ALTER PROPERTY DashboardBoxType.kind CUSTOM type='Pie chart, Serial chart, Feedback status, Profit status, Orders status, Users status'
    ALTER PROPERTY DashboardBoxType.codeLanguage MANDATORY true
    ALTER PROPERTY DashboardBoxType.codeLanguage CUSTOM type='SQL,JavaScript'
    ALTER PROPERTY DashboardBoxType.code MANDATORY true

    CREATE INDEX DashboardBoxType.name UNIQUE

    let statusType = INSERT INTO DashboardBoxType SET name = 'Ivan feeds', type = 'status', kind = 'Feedback status', code = '', codeLanguage = 'SQL'
    let pieChartType = INSERT INTO DashboardBoxType SET name = 'Petia profit', type = 'chart', kind = 'Pie chart', code = "return {data: \"[ { 'country': 'Lithuania', 'litres': 501.9 }, { 'country': 'Czech Republic', 'litres': 301.9 }, { 'country': 'Ireland', 'litres': 201.1 }, { 'country': 'Germany', 'litres': 165.8 }, { 'country': 'Australia', 'litres': 139.9 }, { 'country': 'Austria', 'litres': 128.3 }, { 'country': 'UK', 'litres': 99 }, { 'country': 'Belgium', 'litres': 60 }, { 'country': 'The Netherlands', 'litres': 50 } ]\"}", codeLanguage = 'JavaScript'
    let serialChartType = INSERT INTO DashboardBoxType SET name = 'Rusia chart profit', type = 'chart', kind = 'Serial chart', code = "return {data: \"[{ date: new Date(2012, 11), value: 0, value0: 0 }, { date: new Date(2013, 0), value: 15000, value0: 19000 }, { date: new Date(2013, 1), value: 30000, value0: 20000 }, { date: new Date(2013, 2), value: 25000, value0: 22000 }, { date: new Date(2013, 3), value: 21000, value0: 25000 }, { date: new Date(2013, 4), value: 24000, value0: 29000 }, { date: new Date(2013, 5), value: 31000, value0: 26000 }, { date: new Date(2013, 6), value: 40000, value0: 25000 }, { date: new Date(2013, 7), value: 37000, value0: 20000 }, { date: new Date(2013, 8), value: 18000, value0: 22000 }, { date: new Date(2013, 9), value: 5000, value0: 26000 }, { date: new Date(2013, 10), value: 40000, value0: 30000 }, { date: new Date(2013, 11), value: 20000, value0: 25000 }, { date: new Date(2014, 0), value: 5000, value0: 13000 }, { date: new Date(2014, 1), value: 3000, value0: 13000 }, { date: new Date(2014, 2), value: 1800, value0: 13000 }, { date: new Date(2014, 3), value: 10400, value0: 13000 }, { date: new Date(2014, 4), value: 25500, value0: 13000 }, { date: new Date(2014, 5), value: 2100, value0: 13000 }, { date: new Date(2014, 6), value: 6500, value0: 13000 }, { date: new Date(2014, 7), value: 1100, value0: 13000 }, { date: new Date(2014, 8), value: 17200, value0: 13000 }, { date: new Date(2014, 9), value: 26900, value0: 13000 }, { date: new Date(2014, 10), value: 14100, value0: 13000 }, { date: new Date(2014, 11), value: 35300, value0: 13000 }, { date: new Date(2015, 0), value: 54800, value0: 13000 }, { date: new Date(2015, 1), value: 49800, value0: 13000 }]\"}", codeLanguage = 'JavaScript'

    console.log "Creating process for DashboardBoxType class is done."
  }

  let DashboardBox = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'DashboardBox';

  if ($DashboardBox.size() == 0) {
    console.log "DashboardBox class not exists! Start creating process."

    let statusType = select * from DashboardBoxType where name = 'Ivan feeds'
    let pieChartType = select * from DashboardBoxType where name = 'Petia profit'
    let serialChartType = select * from DashboardBoxType where name = 'Rusia chart profit'
    let defaultDashboard = select * from Dashboard where name = 'default'

    CREATE Class DashboardBox

    CREATE PROPERTY DashboardBox.width EMBEDDEDLIST
    CREATE PROPERTY DashboardBox.height EMBEDDEDLIST
    CREATE PROPERTY DashboardBox.order INTEGER
    CREATE PROPERTY DashboardBox.name STRING
    CREATE PROPERTY DashboardBox.description STRING
    CREATE PROPERTY DashboardBox.dashboard LINK Dashboard
    CREATE PROPERTY DashboardBox.type LINK DashboardBoxType

    ALTER PROPERTY DashboardBox.width MANDATORY true
    ALTER PROPERTY DashboardBox.width CUSTOM type='25,50,75,100'
    ALTER PROPERTY DashboardBox.height MANDATORY true
    ALTER PROPERTY DashboardBox.height CUSTOM type='25,50,75,100'
    ALTER PROPERTY DashboardBox.order MANDATORY true
    ALTER PROPERTY DashboardBox.name MANDATORY true
    ALTER PROPERTY DashboardBox.description MANDATORY true
    ALTER PROPERTY DashboardBox.dashboard MANDATORY true
    ALTER PROPERTY DashboardBox.type MANDATORY true

    INSERT INTO DashboardBox SET width = 25, height = 25, order = 1, dashboard = $defaultDashboard['@rid'][0], type = $statusType['@rid'][0], name = 'Box 1', description = 'Box 1 desc'
    INSERT INTO DashboardBox SET width = 25, height = 25, order = 2, dashboard = $defaultDashboard['@rid'][0], type = $statusType['@rid'][0], name = 'Box 2', description = 'Box 2 desc'
    INSERT INTO DashboardBox SET width = 25, height = 25, order = 3, dashboard = $defaultDashboard['@rid'][0], type = $statusType['@rid'][0], name = 'Box 3', description = 'Box 3 desc'
    INSERT INTO DashboardBox SET width = 25, height = 25, order = 4, dashboard = $defaultDashboard['@rid'][0], type = $statusType['@rid'][0], name = 'Box 4', description = 'Box 4 desc'

    INSERT INTO DashboardBox SET width = 50, height = 50, order = 5, dashboard = $defaultDashboard['@rid'][0], type = $pieChartType['@rid'][0], name = 'Box 5', description = 'Box 5 desc'
    INSERT INTO DashboardBox SET width = 50, height = 50, order = 6, dashboard = $defaultDashboard['@rid'][0], type = $serialChartType['@rid'][0], name = 'Box 6', description = 'Box 6 desc'

    console.log "Creating process for DashboardBox class is done."
  }

  console.log "Insert into Crud Meta"

  INSERT INTO CrudClassMetaData SET class = 'Dashboard', titleColumns = 'name', editable = true
  INSERT INTO CrudClassMetaData SET class = 'DashboardBox', titleColumns = 'name', editable = true
  INSERT INTO CrudClassMetaData SET class = 'DashboardBoxType', titleColumns = 'name', editable = true

  let CrudClassMetaData_Dashboard = SELECT * FROM CrudClassMetaData WHERE class = 'Dashboard'
  let CrudClassMetaData_DashboardBox = SELECT * FROM CrudClassMetaData WHERE class = 'DashboardBox'
  let CrudClassMetaData_DashboardBoxType = SELECT * FROM CrudClassMetaData WHERE class = 'DashboardBoxType'

  INSERT INTO CrudMetaFormData  SET property = 'name', editable = true, visible = true, order = 1, crudClassMetaData = $CrudClassMetaData_Dashboard['@rid'][0]

  INSERT INTO CrudMetaFormData  SET property = 'name', editable = true, visible = true, order = 1, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'description', editable = true, visible = true, order = 2, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'type', editable = true, visible = true, order = 3, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'dashboard', editable = true, visible = false, order = 4, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'width', editable = true, visible = true, order = 5, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'height', editable = true, visible = true, order = 6, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'order', editable = true, visible = true, order = 7, crudClassMetaData = $CrudClassMetaData_DashboardBox['@rid'][0]

  INSERT INTO CrudMetaFormData  SET property = 'name', editable = true, visible = true, order = 1, crudClassMetaData = $CrudClassMetaData_DashboardBoxType['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'type', editable = true, visible = true, order = 2, crudClassMetaData = $CrudClassMetaData_DashboardBoxType['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'kind', editable = true, visible = true, order = 3, crudClassMetaData = $CrudClassMetaData_DashboardBoxType['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'codeLanguage', editable = true, visible = true, order = 4, crudClassMetaData = $CrudClassMetaData_DashboardBoxType['@rid'][0]
  INSERT INTO CrudMetaFormData  SET property = 'code', editable = true, visible = true, order = 5, crudClassMetaData = $CrudClassMetaData_DashboardBoxType['@rid'][0]
}

return true
