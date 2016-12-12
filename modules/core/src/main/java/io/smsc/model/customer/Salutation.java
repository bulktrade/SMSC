package io.smsc.model.customer;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public enum Salutation {
    CEO,
    TECHNICAL,
    PRIMARY
}
