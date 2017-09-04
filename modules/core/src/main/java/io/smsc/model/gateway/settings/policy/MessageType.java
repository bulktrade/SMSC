package io.smsc.model.gateway.settings.policy;

/**
 * Specifies MessageTypes which can be used in {@link MessagePolicy} and {@link SenderPolicy}
 *
 * @author Nazar Lipkovskyy
 * @since 0.0.4-SNAPSHOT
 */
public enum MessageType {
    DYN,
    FIX,
    FLASH
}