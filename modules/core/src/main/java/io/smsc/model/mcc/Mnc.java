package io.smsc.model.mcc;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;
import java.util.Objects;

/**
 * Specifies Mnc class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "MNC", uniqueConstraints = {
                        @UniqueConstraint(columnNames = {"MCC", "MNC"}, name = "mnc_unique_mnc_mcc_idx")},
                    indexes = {
                        @Index(columnList = "MCC", name = "fk_mcc_idx")})
public class Mnc extends BaseEntity {

    @Id
    @SequenceGenerator(name = "mnc_seq", sequenceName = "mnc_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "mnc_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "MNC", nullable = false)
    @NotEmpty
    private String mnc;

    @OneToOne(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.REFRESH,
                CascadeType.MERGE,
                CascadeType.PERSIST
    })
    @JoinColumn(name = "MCC", referencedColumnName = "MCC", nullable = false)
    private Mcc mcc;

    @Column(name = "CARRIER", nullable = false)
    @NotEmpty
    private String carrier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMnc() {
        return mnc;
    }

    public void setMnc(String mnc) {
        this.mnc = mnc;
    }

    public Mcc getMcc() {
        return mcc;
    }

    public void setMcc(Mcc mcc) {
        this.mcc = mcc;
    }

    public String getCarrier() {
        return carrier;
    }

    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Mnc mnc1 = (Mnc) o;

        if (!getId().equals(mnc1.getId())) return false;
        if (!getMnc().equals(mnc1.getMnc())) return false;
        return getCarrier().equals(mnc1.getCarrier());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getMcc());
        result = 31 * result + Objects.hashCode(getCarrier());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", mnc = '" + mnc + '\'' +
                ", carrier = '" + carrier + '\'' +
                ", createdBy = '" + createdBy + '\'' +
                ", lastModifiedBy = '" + lastModifiedBy + '\'' +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                ", version = " + version +
                "}";
    }
}
