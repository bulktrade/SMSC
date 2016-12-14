package io.smsc.test_data;

import io.smsc.matcher.ModelMatcher;
import io.smsc.model.customer.Customer;

import static io.smsc.test_data.UserTestData.*;
import static io.smsc.test_data.CustomerContactTestData.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;

public class CustomerTestData {

    public static final long CUSTOMER_ID_1 = 138;

    public static final Customer CUSTOMER_1 = new Customer(CUSTOMER_ID_1, 1.0, "SMSC", "Amtsgericht", "Amtsgericht", "3254", "Germany", "Stuttgart", 5672394.0);

    static {
        CUSTOMER_1.setUsers(Arrays.asList(USER,ADMIN));
        CUSTOMER_1.setContacts(Collections.singletonList(CUSTOMER_CONTACT_1));
    }

    public static final ModelMatcher<Customer> CUSTOMER_MODEL_MATCHER = new ModelMatcher<>(Customer.class,
            (expected, actual) -> expected == actual ||
                    (Objects.equals(expected.getId(), actual.getId())
                            && Objects.equals(expected.getCustomerId(), actual.getCustomerId())
                            && Objects.equals(expected.getCompanyName(), actual.getCompanyName())
                            && Objects.equals(expected.getStreet(), actual.getStreet())
                            && Objects.equals(expected.getStreet2(), actual.getStreet2())
                            && Objects.equals(expected.getPostcode(), actual.getPostcode())
                            && Objects.equals(expected.getCountry(), actual.getCountry())
                            && Objects.equals(expected.getCity(), actual.getCity())
                            && Objects.equals(expected.getVatid(), actual.getVatid())
                            && Objects.equals(expected.getContacts(), actual.getContacts())
                            && Objects.equals(expected.getUsers(), actual.getUsers())
                    )
    );
}
