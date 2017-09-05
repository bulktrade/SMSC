package io.smsc.model.gateway.settings.policy;

import io.smsc.model.BaseEntity;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies SenderPolicy class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "GATEWAY_SENDER_POLICY")
public class SenderPolicy extends BaseEntity {

    @Id
    @SequenceGenerator(name = "gateway_sender_policy_seq", sequenceName = "gateway_sender_policy_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gateway_sender_policy_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "MESSAGE_TYPE", nullable = false)
    @NotNull(message = "{gateway.senderPolicy.messageType.null.message}")
    private MessageType messageType;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{gateway.senderPolicy.type.null.message}")
    private Type type;

    @Column(name = "VALUE", nullable = false)
    @NotEmpty(message = "{gateway.senderPolicy.value.empty.message}")
    private String value;

    @Column(name = "POLICY", nullable = false)
    @NotEmpty(message = "{gateway.senderPolicy.policy.empty.message}")
    private String policy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SenderPolicy that = (SenderPolicy) o;

        if (!id.equals(that.id)) return false;
        if (messageType != that.messageType) return false;
        if (type != that.type) return false;
        if (!value.equals(that.value)) return false;
        return policy.equals(that.policy);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getMessageType());
        result = 31 * result + Objects.hashCode(getType());
        result = 31 * result + Objects.hashCode(getValue());
        result = 31 * result + Objects.hashCode(getPolicy());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", messageType = " + messageType +
                ", type = " + type +
                ", value = '" + value + '\'' +
                ", policy = '" + policy + '\'' +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
