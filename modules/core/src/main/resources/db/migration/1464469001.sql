CREATE Class Customer
CREATE PROPERTY Customer.customerId DOUBLE
CREATE PROPERTY Customer.companyName STRING
CREATE PROPERTY Customer.street STRING
CREATE PROPERTY Customer.street2 STRING
CREATE PROPERTY Customer.postcode DOUBLE
CREATE PROPERTY Customer.country STRING
CREATE PROPERTY Customer.city STRING
CREATE PROPERTY Customer.vatid DOUBLE

CREATE Class CustomerContacts
CREATE PROPERTY CustomerContacts.type EMBEDDEDLIST
CREATE PROPERTY CustomerContacts.salutation EMBEDDEDLIST
CREATE PROPERTY CustomerContacts.firstname STRING
CREATE PROPERTY CustomerContacts.surename STRING
CREATE PROPERTY CustomerContacts.phone STRING
CREATE PROPERTY CustomerContacts.mobilePhone STRING
CREATE PROPERTY CustomerContacts.fax STRING
CREATE PROPERTY CustomerContacts.emailAddress STRING

CREATE PROPERTY Customer.contacts LINKSET CustomerContacts
CREATE PROPERTY Customer.users LINKSET OUser
CREATE PROPERTY Customer.parentCustomer LINK Customer

CREATE SEQUENCE customerIdSeq TYPE ORDERED

CREATE INDEX Customer.customerId UNIQUE
CREATE INDEX CustomerContacts.emailAddress UNIQUE

ALTER PROPERTY Customer.customerId NOTNULL true
ALTER PROPERTY Customer.companyName NOTNULL true
ALTER PROPERTY Customer.street NOTNULL true
ALTER PROPERTY Customer.street2 NOTNULL true
ALTER PROPERTY Customer.postcode NOTNULL true
ALTER PROPERTY Customer.country NOTNULL true
ALTER PROPERTY Customer.city NOTNULL true
ALTER PROPERTY Customer.contacts NOTNULL true
ALTER PROPERTY Customer.users NOTNULL true
ALTER PROPERTY Customer.parentCustomer NOTNULL true

ALTER PROPERTY CustomerContacts.type NOTNULL true
ALTER PROPERTY CustomerContacts.salutation NOTNULL true
ALTER PROPERTY CustomerContacts.firstname NOTNULL true
ALTER PROPERTY CustomerContacts.surename NOTNULL true
ALTER PROPERTY CustomerContacts.phone NOTNULL true
ALTER PROPERTY CustomerContacts.mobilePhone NOTNULL true
ALTER PROPERTY CustomerContacts.emailAddress NOTNULL true

