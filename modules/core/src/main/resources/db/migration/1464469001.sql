CREATE Class customer
CREATE PROPERTY customer.customer_id INTEGER
CREATE PROPERTY customer.company_name STRING

CREATE Class contacts
CREATE PROPERTY contacts.contacts_id INTEGER
CREATE PROPERTY contacts.type EMBEDDEDLIST
CREATE PROPERTY contacts.salutation EMBEDDEDLIST
CREATE PROPERTY contacts.firstname STRING
CREATE PROPERTY contacts.surename STRING
CREATE PROPERTY contacts.phone STRING
CREATE PROPERTY contacts.mobile_phone STRING
CREATE PROPERTY contacts.fax STRING
CREATE PROPERTY contacts.email_address STRING
CREATE PROPERTY contacts.street STRING
CREATE PROPERTY contacts.street2 STRING
CREATE PROPERTY contacts.postcode INTEGER
CREATE PROPERTY contacts.country STRING
CREATE PROPERTY contacts.city STRING
CREATE PROPERTY contacts.vatid INTEGER
CREATE PROPERTY contacts.parent_customer INTEGER
CREATE PROPERTY contacts.ouser_id INTEGER

CREATE PROPERTY customer.contacts LINKSET contacts
CREATE PROPERTY contacts.users LINKSET OUser

CREATE LINK contacts TYPE LINKSET FROM contacts.parent_customer TO customer.customer_id INVERSE
