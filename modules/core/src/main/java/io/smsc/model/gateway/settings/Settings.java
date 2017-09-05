package io.smsc.model.gateway.settings;

import io.smsc.model.BaseEntity;
import io.smsc.model.gateway.settings.limit.Limit;
import io.smsc.model.gateway.settings.notification.Notification;
import io.smsc.model.gateway.settings.policy.MessagePolicy;
import io.smsc.model.gateway.settings.policy.SenderPolicy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies Settings class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "GATEWAY_SETTINGS")
public class Settings extends BaseEntity {

    @Id
    @SequenceGenerator(name = "gateway_settings_seq", sequenceName = "gateway_settings_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gateway_settings_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT", nullable = false)
    @NotNull(message = "{gateway.settings.payment.null.message}")
    private Payment payment;

    @Column(name = "DEPOSIT", nullable = false)
    @NotNull(message = "{gateway.settings.deposit.null.message}")
    private Double deposit;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="NOTIFICATION_ID", nullable = false)
    @NotNull(message = "{gateway.settings.notification.null.message}")
    private Notification notification;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="LIMIT_ID", nullable = false)
    @NotNull(message = "{gateway.settings.limit.null.message}")
    private Limit limit;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="SENDER_POLICY_ID", nullable = false)
    @NotNull(message = "{gateway.settings.senderPolicy.null.message}")
    private SenderPolicy senderPolicy;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="MESSAGE_POLICY_ID", nullable = false)
    @NotNull(message = "{gateway.settings.messagePolicy.null.message}")
    private MessagePolicy messagePolicy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Limit getLimit() {
        return limit;
    }

    public void setLimit(Limit limit) {
        this.limit = limit;
    }

    public SenderPolicy getSenderPolicy() {
        return senderPolicy;
    }

    public void setSenderPolicy(SenderPolicy senderPolicy) {
        this.senderPolicy = senderPolicy;
    }

    public MessagePolicy getMessagePolicy() {
        return messagePolicy;
    }

    public void setMessagePolicy(MessagePolicy messagePolicy) {
        this.messagePolicy = messagePolicy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Settings settings = (Settings) o;

        if (!id.equals(settings.id)) return false;
        if (payment != settings.payment) return false;
        return deposit.equals(settings.deposit);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(getId());
        result = 31 * result + Objects.hashCode(getPayment());
        result = 31 * result + Objects.hashCode(getDeposit());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", payment = " + payment +
                ", deposit = " + deposit +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
