package io.smsc.model.gateway.settings.limit;

/**
 * Specifies Types which can be used in {@link Limit}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
public enum Type {
    DAY,
    MONTH,
    YEAR,
    HOUR,
    MINUTE,
    SECOND,
    MILLISECOND
}
