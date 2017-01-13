package io.smsc.model.crud;

/**
 * Specifies Operators which can be used in {@link MetaDataPropertyBindingParameter}
 *
 * @author  Nazar Lipkovskyy
 * @since   0.0.1-SNAPSHOT
 */
public enum Operator {
    EQUALS,
    MORE,
    LESS,
    MORE_OR_EQUALS,
    LESS_OR_EQUALS,
    MORE_OR_LESS,
    LIKE,
    BETWEEN,
    IS,
    INSTANCE_OF,
    MATCHES
}
