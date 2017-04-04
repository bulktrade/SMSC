package io.smsc.model;

import com.fasterxml.jackson.annotation.*;

import io.smsc.model.admin.User;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.persistence.AccessType;
import javax.persistence.Version;
import java.io.Serializable;
import java.util.Date;

/**
 * Specifies Base entity class as an mapped superclass. It's mapping information
 * is applied to the entities that inherit from it. It contains only lastModifiedData
 * and version properties.
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.1-SNAPSHOT
 */
@MappedSuperclass
@Access(AccessType.FIELD)
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"}, ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

    protected static final long serialVersionUID = 1L;

    @CreatedBy
    @ManyToOne
    @JoinColumn(name = "CREATED_BY_ID", updatable = false)
    @JsonIgnore
    protected User createdBy;

    @LastModifiedBy
    @ManyToOne
    @JoinColumn(name = "LAST_MODIFIED_BY_ID")
    @JsonIgnore
    protected User lastModifiedBy;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    @JsonIgnore
    protected Date createdDate = new Date();

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "LAST_MODIFIED_DATE", nullable = false)
    @JsonIgnore
    protected Date lastModifiedDate = new Date();

    @Version
    @Column(name = "VERSION", nullable = false)
    @JsonIgnore
    protected Long version;

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
}
