let customerContactClass = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'CustomerContact';

if ($customerContactClass.size() == 0) {
  console.log "CustomerContact class not exists! Start creating process."

  CREATE Class CustomerContact
  CREATE PROPERTY CustomerContact.type EMBEDDEDLIST
  CREATE PROPERTY CustomerContact.salutation EMBEDDEDLIST
  CREATE PROPERTY CustomerContact.firstname STRING
  CREATE PROPERTY CustomerContact.surename STRING
  CREATE PROPERTY CustomerContact.phone STRING
  CREATE PROPERTY CustomerContact.mobilePhone STRING
  CREATE PROPERTY CustomerContact.fax STRING
  CREATE PROPERTY CustomerContact.emailAddress STRING

  ALTER PROPERTY CustomerContact.type MANDATORY true
  ALTER PROPERTY CustomerContact.salutation MANDATORY true
  ALTER PROPERTY CustomerContact.firstname MANDATORY true
  ALTER PROPERTY CustomerContact.surename MANDATORY true
  ALTER PROPERTY CustomerContact.phone MANDATORY true
  ALTER PROPERTY CustomerContact.mobilePhone MANDATORY true
  ALTER PROPERTY CustomerContact.emailAddress MANDATORY true
  ALTER PROPERTY CustomerContact.type CUSTOM type='CEO,technical,primary'

  CREATE INDEX CustomerContact.emailAddress UNIQUE

  console.log "Creating process for CustomerContact class is done."
}

let customerClass = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'Customer';

if ($customerClass.size() == 0) {
  console.log "Customer class not exists! Start creating process."

  CREATE Class Customer
  CREATE PROPERTY Customer.customerId DOUBLE
  CREATE PROPERTY Customer.companyName STRING
  CREATE PROPERTY Customer.street STRING
  CREATE PROPERTY Customer.street2 STRING
  CREATE PROPERTY Customer.postcode DOUBLE
  CREATE PROPERTY Customer.country STRING
  CREATE PROPERTY Customer.city STRING
  CREATE PROPERTY Customer.vatid DOUBLE

  CREATE PROPERTY Customer.contacts LINKSET CustomerContact
  CREATE PROPERTY Customer.users LINKSET OUser
  CREATE PROPERTY Customer.parentCustomer LINK Customer

  ALTER PROPERTY Customer.customerId MANDATORY true
  ALTER PROPERTY Customer.companyName MANDATORY true
  ALTER PROPERTY Customer.street MANDATORY true
  ALTER PROPERTY Customer.street2 MANDATORY true
  ALTER PROPERTY Customer.postcode MANDATORY true
  ALTER PROPERTY Customer.country MANDATORY true
  ALTER PROPERTY Customer.city MANDATORY true
  ALTER PROPERTY Customer.contacts MANDATORY true
  ALTER PROPERTY Customer.users MANDATORY true

  CREATE INDEX Customer.customerId UNIQUE

  console.log "Creating process for Customer class is done."
}

let crudClassMetaData = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'CrudClassMetaData';

if ($crudClassMetaData.size() == 0) {
  console.log "CrudClassMetaData class not exists! Start creating process."

  CREATE Class CrudClassMetaData
  CREATE PROPERTY CrudClassMetaData.class STRING
  CREATE PROPERTY CrudClassMetaData.titleColumns STRING
  CREATE PROPERTY CrudClassMetaData.editable BOOLEAN
  CREATE PROPERTY CrudClassMetaData.query STRING

  CREATE INDEX CrudClassMetaData.class UNIQUE
  CREATE INDEX CrudClassMetaData.titleColumns UNIQUE

  console.log "Creating process for CrudClassMetaData class is done."
}

let metaDataPropertyBindingParameter = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'MetaDataPropertyBindingParameter';

if ($metaDataPropertyBindingParameter.size() == 0) {
  console.log "MetaDataPropertyBindingParameter class not exists! Start creating process."

  CREATE Class MetaDataPropertyBindingParameter
  CREATE PROPERTY MetaDataPropertyBindingParameter.fromProperty STRING
  CREATE PROPERTY MetaDataPropertyBindingParameter.toProperty STRING
  CREATE PROPERTY MetaDataPropertyBindingParameter.combineOperator EMBEDDEDLIST
  CREATE PROPERTY MetaDataPropertyBindingParameter.operator EMBEDDEDLIST

  ALTER PROPERTY MetaDataPropertyBindingParameter.operator CUSTOM type='=,>,<,>=,<=,<>,like,BETWEEN,is,INSTANCEOF,MATCHES'
  ALTER PROPERTY MetaDataPropertyBindingParameter.combineOperator CUSTOM type='AND,OR,NOT'

  console.log "Creating process for MetaDataPropertyBindingParameter class is done."
}

let crudPropertyMetaData = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'CrudPropertyMetaData';

if ($crudPropertyMetaData.size() == 0) {
  console.log "CrudPropertyMetaData class not exists! Start creating process."

  CREATE Class CrudPropertyMetaData
  CREATE PROPERTY CrudPropertyMetaData.property STRING
  CREATE PROPERTY CrudPropertyMetaData.editable BOOLEAN
  CREATE PROPERTY CrudPropertyMetaData.visible BOOLEAN
  CREATE PROPERTY CrudPropertyMetaData.decorator STRING
  CREATE PROPERTY CrudPropertyMetaData.order DOUBLE
  CREATE PROPERTY CrudPropertyMetaData.crudClassMetaData LINK CrudClassMetaData
  CREATE PROPERTY CrudPropertyMetaData.bingingProperties LINKSET MetaDataPropertyBindingParameter

  console.log "Creating process for CrudPropertyMetaData class is done."
}

let crudMetaGridData = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'CrudMetaGridData';

if ($crudMetaGridData.size() == 0) {
  console.log "CrudMetaGridData class not exists! Start creating process."

  CREATE Class CrudMetaGridData
  CREATE PROPERTY CrudMetaGridData.columnWidth DOUBLE
  ALTER CLASS CrudMetaGridData SUPERCLASS +CrudPropertyMetaData

  console.log "Creating process for CrudMetaGridData class is done."
}

let crudMetaFormData = SELECT FROM (SELECT expand(classes) FROM metadata:schema) WHERE name = 'CrudMetaFormData';

if ($crudMetaFormData.size() == 0) {
  console.log "CrudMetaFormData class not exists! Start creating process."

  CREATE Class CrudMetaFormData
  CREATE PROPERTY CrudMetaFormData.fieldLayoutGridPosition STRING
  ALTER CLASS CrudMetaFormData SUPERCLASS +CrudPropertyMetaData

  console.log "Creating process for CrudMetaFormData class is done."
}

INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('CrudMetaGridData', 'columnWidth', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('CrudMetaFormData', 'fieldLayoutGridPosition', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('CrudClassMetaData', 'class', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('Customer', 'customerId', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('OUser', 'name', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('MetaDataPropertyBindingParameter', 'operator', true);

let getCrudMetaGridDataRID = select * from CrudClassMetaData where class = 'CrudMetaGridData' LIMIT 1
let getCrudMetaFormDataRID = select * from CrudClassMetaData where class = 'CrudMetaFormData' LIMIT 1
let getCrudClassMetaDataRID = select * from CrudClassMetaData where class = 'CrudClassMetaData' LIMIT 1
let getCustomerRID = select * from CrudClassMetaData where class = 'Customer' LIMIT 1
let getOUserRID = select * from CrudClassMetaData where class = 'OUser' LIMIT 1
let getMetaDataPropertyBindingParameterRID = select * from CrudClassMetaData where class = 'MetaDataPropertyBindingParameter' LIMIT 1

/*
Declared properties for a class MetaDataPropertyBindingParameter
*/

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('fromProperty', true, true, 1, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('toProperty', true, true, 2, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('combineOperator', true, true, 3, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('operator', true, true, 4, $getMetaDataPropertyBindingParameterRID.@rid[0]);

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('fromProperty', true, true, 1, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('toProperty', true, true, 2, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('combineOperator', true, true, 3, $getMetaDataPropertyBindingParameterRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('operator', true, true, 4, $getMetaDataPropertyBindingParameterRID.@rid[0]);

/*
Declared properties for a class CrudMetaGridData
*/

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('columnWidth', true, true, 1, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 2, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 3, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 4, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 5, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 6, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 7, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('bingingProperties', true, true, 8, $getCrudMetaGridDataRID.@rid[0]);

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('columnWidth', true, true, 1, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 2, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 3, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 4, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 5, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 6, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 7, $getCrudMetaGridDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('bingingProperties', true, true, 8, $getCrudMetaGridDataRID.@rid[0]);

/*
Declared properties for a class CrudMetaFormData
*/

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('fieldLayoutGridPosition', true, true, 1, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 2, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 3, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 4, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 5, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 6, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 7, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('bingingProperties', true, true, 8, $getCrudMetaFormDataRID.@rid[0]);

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('fieldLayoutGridPosition', true, true, 1, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 2, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 3, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 4, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 5, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 6, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 7, $getCrudMetaFormDataRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('bingingProperties', true, true, 8, $getCrudMetaFormDataRID.@rid[0]);

/*
Declared properties for a class Customer
*/

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('customerId', true, true, 1, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('companyName', true, true, 2, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('street', true, true, 3, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('street2', true, true, 4, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('postcode', true, true, 5, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('country', true, true, 6, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('city', true, true, 7, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('vatid', true, true, 8, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('contacts', true, true, 9, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('users', true, true, 10, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('parentCustomer', true, true, 11, $getCustomerRID.@rid[0]);

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('customerId', true, true, 1, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('companyName', true, true, 2, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('street', true, true, 3, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('street2', true, true, 4, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('postcode', true, true, 5, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('country', true, true, 6, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('city', true, true, 7, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('vatid', true, true, 8, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('contacts', true, true, 9, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('users', true, true, 10, $getCustomerRID.@rid[0]);
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('parentCustomer', true, true, 11, $getCustomerRID.@rid[0]);

let customerIdSeqOSequence = SELECT FROM OSequence WHERE name = 'customerIdSeq';

if ($customerIdSeqOSequence.size() == 0) {
  console.log "SEQUENCE customerIdSeq not exists! Start creating process."

  CREATE SEQUENCE customerIdSeq TYPE ORDERED

  console.log "Creating process for SEQUENCE customerIdSeq is done."
}

return true