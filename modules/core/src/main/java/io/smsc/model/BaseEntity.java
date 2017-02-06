package io.smsc.model;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.Hibernate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Specifies Base entity class as an mapped superclass. It's mapping information
 * is applied to the entities that inherit from it. It contains only id property
 * and equals/hashcode implementations.
 *
 * @author  Nazar Lipkovskyy
 * @see     MappedSuperclass
 * @since   0.0.1-SNAPSHOT
 */
@MappedSuperclass
@Access(AccessType.FIELD)
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"}, ignoreUnknown = true)
public class BaseEntity implements Serializable {

    protected static final long serialVersionUID = 1L;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_MODIFIED_DATE", nullable = false)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="UTC")
    protected Date lastModifiedDate = new Date();

    @Version
    @Column(name = "VERSION", nullable = false)
    protected Long version;

    @PreUpdate
    protected void onUpdate() {
        lastModifiedDate = new Date();
    }

    public BaseEntity() {
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long versionNumber) {
        this.version = version;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "BaseEntity{" +
                "lastModifiedDate=" + lastModifiedDate +
                ", version=" + version +
                '}';
    }
}
