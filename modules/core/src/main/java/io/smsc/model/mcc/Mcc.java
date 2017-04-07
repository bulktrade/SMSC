package io.smsc.model.mcc;

import io.smsc.model.BaseEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Set;

/**
 * Specifies Mcc class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "MCC", uniqueConstraints = {
                        @UniqueConstraint(columnNames = "MCC", name = "mnc_unique_mcc_idx")},
                    indexes = {
                        @Index(columnList = "MCC", name = "mcc_idx"),
                        @Index(columnList = "CODE", name = "code_idx"),
                        @Index(columnList = "MCC,CODE", name = "mcc_code_idx"),
                        @Index(columnList = "MCC,CODE,COUNTRY", name = "mcc_code_country_idx")})
public class Mcc extends BaseEntity {

    protected static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "mcc_seq", sequenceName = "mcc_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "mcc_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "MCC", nullable = false)
    @NotNull
    @Access(value = AccessType.PROPERTY)
    private Integer mcc;

    @Column(name = "CODE", nullable = false)
    @NotNull
    @Access(value = AccessType.PROPERTY)
    private Integer code;

    @Column(name = "COUNTRY", nullable = false)
    @NotEmpty
    private String country;

    @OneToMany(
            mappedBy = "mcc",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Mnc> mnc;

    public Integer getMcc() {
        return mcc;
    }

    public void setMcc(Integer mcc) {
        this.mcc = mcc;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Mnc> getMnc() {
        return mnc;
    }

    public void setMnc(Set<Mnc> mnc) {
        this.mnc = mnc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Mcc mcc1 = (Mcc) o;

        if (!getId().equals(mcc1.getId())) return false;
        if (!getMcc().equals(mcc1.getMcc())) return false;
        if (!getCode().equals(mcc1.getCode())) return false;
        return getCountry().equals(mcc1.getCountry());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getMcc());
        result = 31 * result + Objects.hashCode(getCode());
        result = 31 * result + Objects.hashCode(getCountry());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", mcc = " + mcc +
                ", code = " + code +
                ", country = '" + country + '\'' +
                ", createdBy = '" + createdBy + '\'' +
                ", lastModifiedBy = '" + lastModifiedBy + '\'' +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                ", version = " + version +
                "}";
    }
}
