package io.smsc.model.gateway.settings.limit;

import io.smsc.model.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies Limit class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "GATEWAY_LIMIT")
public class Limit extends BaseEntity {

    @Id
    @SequenceGenerator(name = "gateway_limit_seq", sequenceName = "gateway_limit_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gateway_limit_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{gateway.limit.type.null.message}")
    private Type type;

    @Column(name = "MESSAGE_LIMIT", nullable = false)
    @NotNull(message = "{gateway.limit.messageLimit.null.message}")
    private Double messageLimit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public double getMessageLimit() {
        return messageLimit;
    }

    public void setMessageLimit(double messageLimit) {
        this.messageLimit = messageLimit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Limit limit = (Limit) o;

        if (!id.equals(limit.id)) return false;
        if (type != limit.type) return false;
        return messageLimit.equals(limit.messageLimit);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id.hashCode());
        result = 31 * result + Objects.hashCode(type.hashCode());
        result = 31 * result + Objects.hashCode(messageLimit.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", type = " + type +
                ", messageLimit = " + messageLimit +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
