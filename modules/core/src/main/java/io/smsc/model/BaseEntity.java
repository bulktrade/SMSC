package io.smsc.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Specifies Base entity class as an mapped superclass. It's mapping information
 * is applied to the entities that inherit from it. It contains only id property
 * and equals/hashcode implementations.
 *
 * @author Nazar Lipkovskyy
 * @see MappedSuperclass
 * @since 0.0.1-SNAPSHOT
 */
@MappedSuperclass
@Access(AccessType.FIELD)
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"}, ignoreUnknown = true)
public abstract class BaseEntity implements Serializable {

    protected static final long serialVersionUID = 1L;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_MODIFIED_DATE", nullable = false)
    @JsonIgnore
    protected Date lastModifiedDate = new Date();

    @Version
    @Column(name = "VERSION", nullable = false)
    @JsonIgnore
    protected Long version;

    @PreUpdate
    protected void onUpdate() {
        lastModifiedDate = new Date();
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    @JsonIgnore
    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "{lastModifiedDate=" + lastModifiedDate +
                ", version=" + version +
                '}';
    }
}
