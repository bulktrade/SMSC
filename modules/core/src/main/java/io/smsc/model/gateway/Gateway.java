package io.smsc.model.gateway;

import io.smsc.model.BaseEntity;
import io.smsc.model.gateway.settings.Settings;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * Specifies Gateway class as an entity class.
 *
 * @author Nazar Lipkovskyy
 * @see BaseEntity
 * @since 0.0.4-SNAPSHOT
 */
@Entity
@Table(name = "GATEWAY", uniqueConstraints = {@UniqueConstraint(columnNames = {"NAME"}, name = "gateway_unique_name_idx")})
public class Gateway extends BaseEntity {

    @Id
    @SequenceGenerator(name = "gateway_seq", sequenceName = "gateway_seq")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gateway_seq")
    @Column(name = "ID")
    @Access(value = AccessType.PROPERTY)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotEmpty(message = "{gateway.name.empty.message}")
    private String name;

    @Column(name = "ACTIVE", nullable = false)
    @NotNull(message = "{gateway.active.null.message}")
    private boolean active;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="SETTINGS_ID", nullable = false)
    @NotNull(message = "{gateway.settings.null.message}")
    private Settings settings;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    @NotNull(message = "{gateway.type.null.message}")
    private Type type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Settings getSettings() {
        return settings;
    }

    public void setSettings(Settings settings) {
        this.settings = settings;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Gateway gateway = (Gateway) o;

        if (active != gateway.active) return false;
        if (!id.equals(gateway.id)) return false;
        if (!name.equals(gateway.name)) return false;
        return type == gateway.type;
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id.hashCode());
        result = 31 * result + Objects.hashCode(name.hashCode());
        result = 31 * result + (active ? 1 : 0);
        result = 31 * result + Objects.hashCode(type.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "{id = " + id +
                ", name = '" + name + '\'' +
                ", active = " + active +
                ", type = " + type +
                ", version = " + version +
                ", createdDate = '" + createdDate + '\'' +
                ", lastModifiedDate = '" + lastModifiedDate + '\'' +
                "}";
    }
}
