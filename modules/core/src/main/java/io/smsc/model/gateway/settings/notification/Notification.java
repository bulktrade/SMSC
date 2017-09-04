package io.smsc.model.gateway.settings.notification;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies Notification class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "GATEWAY_NOTIFICATION")
public class Notification extends BaseEntity {

    @Id
    @SequenceGenerator(name = "gateway_notification_seq", sequenceName = "gateway_notification_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gateway_notification_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "PUSH_TYPE", nullable = false)
    @NotNull(message = "{gateway.notification.pushType.validation}")
    private PushType pushType;

    @Column(name = "PUSH_URL", nullable = false)
    @NotEmpty(message = "{gateway.notification.pushUrl.validation}")
    private String pushUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PushType getPushType() {
        return pushType;
    }

    public void setPushType(PushType pushType) {
        this.pushType = pushType;
    }

    public String getPushUrl() {
        return pushUrl;
    }

    public void setPushUrl(String pushUrl) {
        this.pushUrl = pushUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Notification that = (Notification) o;

        if (!id.equals(that.id)) return false;
        if (pushType != that.pushType) return false;
        return pushUrl.equals(that.pushUrl);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id.hashCode());
        result = 31 * result + Objects.hashCode(pushType.hashCode());
        result = 31 * result + Objects.hashCode(pushUrl.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", pushType = " + pushType +
                ", pushUrl = '" + pushUrl + '\'' +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
