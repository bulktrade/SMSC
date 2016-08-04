CREATE Class Customer
CREATE PROPERTY Customer.customerId DOUBLE
CREATE PROPERTY Customer.companyName STRING
CREATE PROPERTY Customer.street STRING
CREATE PROPERTY Customer.street2 STRING
CREATE PROPERTY Customer.postcode DOUBLE
CREATE PROPERTY Customer.country STRING
CREATE PROPERTY Customer.city STRING
CREATE PROPERTY Customer.vatid DOUBLE

CREATE Class CustomerContact
CREATE PROPERTY CustomerContact.type EMBEDDEDLIST
CREATE PROPERTY CustomerContact.salutation EMBEDDEDLIST
CREATE PROPERTY CustomerContact.firstname STRING
CREATE PROPERTY CustomerContact.surename STRING
CREATE PROPERTY CustomerContact.phone STRING
CREATE PROPERTY CustomerContact.mobilePhone STRING
CREATE PROPERTY CustomerContact.fax STRING
CREATE PROPERTY CustomerContact.emailAddress STRING

CREATE PROPERTY Customer.contacts LINKSET CustomerContact
CREATE PROPERTY Customer.users LINKSET OUser
CREATE PROPERTY Customer.parentCustomer LINK Customer

CREATE SEQUENCE customerIdSeq TYPE ORDERED

CREATE INDEX Customer.customerId UNIQUE
CREATE INDEX CustomerContact.emailAddress UNIQUE

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

ALTER PROPERTY CustomerContact.type MANDATORY true
ALTER PROPERTY CustomerContact.salutation MANDATORY true
ALTER PROPERTY CustomerContact.firstname MANDATORY true
ALTER PROPERTY CustomerContact.surename MANDATORY true
ALTER PROPERTY CustomerContact.phone MANDATORY true
ALTER PROPERTY CustomerContact.mobilePhone MANDATORY true
ALTER PROPERTY CustomerContact.emailAddress MANDATORY true
ALTER PROPERTY CustomerContact.type CUSTOM type='CEO,technical,primary'

