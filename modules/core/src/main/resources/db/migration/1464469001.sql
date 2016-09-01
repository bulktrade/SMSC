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
  ALTER PROPERTY Customer.parentCustomer MANDATORY true

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
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('CrudClassMetaData', 'Class', true);
INSERT INTO CrudClassMetaData (class, titleColumns, editable) VALUES ('Customer', 'Users', true);

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('columnWidth', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 1, '34:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 1, '34:0');

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('fieldLayoutGridPosition', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 1, '35:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 1, '35:0');

INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('customerId', true, true, 1, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('companyName', true, true, 2, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('street', true, true, 3, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('street2', true, true, 4, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('postcode', true, true, 5, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('country', true, true, 6, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('city', true, true, 7, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('vatid', true, true, 8, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('contacts', true, true, 9, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('users', true, true, 10, '36:0');
INSERT INTO CrudMetaGridData (property, editable, visible, order, crudClassMetaData) VALUES ('parentCustomer', true, true, 11, '36:0');

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('columnWidth', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 1, '34:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 1, '34:0');

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('fieldLayoutGridPosition', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('property', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('editable', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('visible', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('decorator', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('order', true, true, 1, '35:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('crudClassMetaData', true, true, 1, '35:0');

INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('customerId', true, true, 1, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('companyName', true, true, 2, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('street', true, true, 3, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('street2', true, true, 4, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('postcode', true, true, 5, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('country', true, true, 6, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('city', true, true, 7, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('vatid', true, true, 8, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('contacts', true, true, 9, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('users', true, true, 10, '36:0');
INSERT INTO CrudMetaFormData (property, editable, visible, order, crudClassMetaData) VALUES ('parentCustomer', true, true, 11, '36:0');

let customerIdSeqOSequence = SELECT FROM OSequence WHERE name = 'customerIdSeq';

if ($customerIdSeqOSequence.size() == 0) {
  console.log "SEQUENCE customerIdSeq not exists! Start creating process."

  CREATE SEQUENCE customerIdSeq TYPE ORDERED

  console.log "Creating process for SEQUENCE customerIdSeq is done."
}

return true