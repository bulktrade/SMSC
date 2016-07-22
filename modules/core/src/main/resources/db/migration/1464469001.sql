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

ALTER PROPERTY CustomerContacts.type MANDATORY true
ALTER PROPERTY CustomerContacts.salutation MANDATORY true
ALTER PROPERTY CustomerContacts.firstname MANDATORY true
ALTER PROPERTY CustomerContacts.surename MANDATORY true
ALTER PROPERTY CustomerContacts.phone MANDATORY true
ALTER PROPERTY CustomerContacts.mobilePhone MANDATORY true
ALTER PROPERTY CustomerContacts.emailAddress MANDATORY true

