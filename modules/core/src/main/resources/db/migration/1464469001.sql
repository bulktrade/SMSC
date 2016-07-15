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
CREATE PROPERTY CustomerContacts.contactsId DOUBLE
CREATE PROPERTY CustomerContacts.type EMBEDDEDLIST
CREATE PROPERTY CustomerContacts.salutation EMBEDDEDLIST
CREATE PROPERTY CustomerContacts.firstname STRING
CREATE PROPERTY CustomerContacts.surename STRING
CREATE PROPERTY CustomerContacts.phone STRING
CREATE PROPERTY CustomerContacts.mobilePhone STRING
CREATE PROPERTY CustomerContacts.fax STRING
CREATE PROPERTY CustomerContacts.emailAddress STRING

CREATE INDEX Customer.companyName UNIQUE
CREATE INDEX Customer.street UNIQUE
CREATE INDEX Customer.country UNIQUE
CREATE INDEX Customer.city UNIQUE
CREATE INDEX CustomerContacts.firstname UNIQUE
CREATE INDEX CustomerContacts.surename UNIQUE

CREATE SEQUENCE customerIdSeq TYPE ORDERED

CREATE PROPERTY Customer.contacts LINKSET CustomerContacts
CREATE PROPERTY Customer.users LINKSET OUser
CREATE PROPERTY Customer.parentCustomer LINK Customer