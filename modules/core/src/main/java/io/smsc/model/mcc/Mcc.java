package io.smsc.model.mcc;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.smsc.model.admin.User;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
@IdClass(MccPK.class)
@Table(name = "MCC",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"MCC", "CODE", "COUNTRY"}, name = "mcc_unique_mcc_code_idx")},
        indexes = {@Index(columnList = "MCC", name = "mcc_idx"),
                @Index(columnList = "CODE", name = "code_idx"),
                @Index(columnList = "MCC,CODE", name = "mcc_code_idx"),
                @Index(columnList = "MCC,CODE,COUNTRY", name = "mcc_code_country_idx", unique = true)})
@Access(AccessType.FIELD)
@EntityListeners(AuditingEntityListener.class)
public class Mcc implements Serializable {

    protected static final long serialVersionUID = 1L;

    @Id
    @Column(name = "MCC", updatable = false)
    @Access(value = AccessType.PROPERTY)
    private Integer mcc;

    @Id
    @Column(name = "CODE", updatable = false)
    @Access(value = AccessType.PROPERTY)
    private Integer code;

    @Column(name = "COUNTRY")
    @NotEmpty
    private String country;

    @CreatedBy
    @ManyToOne
    @JoinColumn(name = "CREATED_BY_ID", updatable = false)
    @JsonIgnore
    private User createdBy;

    @LastModifiedBy
    @ManyToOne
    @JoinColumn(name = "LAST_MODIFIED_BY_ID")
    @JsonIgnore
    private User lastModifiedBy;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    @JsonIgnore
    private Date createdDate = new Date();

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_MODIFIED_DATE", nullable = false)
    @JsonIgnore
    private Date lastModifiedDate = new Date();

    @Version
    @Column(name = "VERSION", nullable = false)
    @JsonIgnore
    private Long version;

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

    @JsonProperty
    public Long getVersion() {
        return version;
    }

    @JsonIgnore
    public void setVersion(Long versionNumber) {
        this.version = versionNumber;
    }

    @JsonProperty
    public User getCreatedBy() {
        return createdBy;
    }

    @JsonIgnore
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    @JsonProperty
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    public Date getCreatedDate() {
        return createdDate;
    }

    @JsonIgnore
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @JsonProperty
    public User getLastModifiedBy() {
        return lastModifiedBy;
    }

    @JsonIgnore
    public void setLastModifiedBy(User lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @JsonProperty
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    @JsonIgnore
    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Mcc mcc1 = (Mcc) o;

        if (!getMcc().equals(mcc1.getMcc())) return false;
        if (!getCode().equals(mcc1.getCode())) return false;
        return getCountry().equals(mcc1.getCountry());
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getMcc());
        result = 31 * result + Objects.hashCode(getCode());
        result = 31 * result + Objects.hashCode(getCountry());
        return result;
    }

    @Override
    public String toString() {
        return "{mcc = " + mcc +
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
