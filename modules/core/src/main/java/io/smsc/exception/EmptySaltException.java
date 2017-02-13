package io.smsc.exception;

public class EmptySaltException extends RuntimeException {

    public EmptySaltException() {
        super();
    }

    public EmptySaltException(String message) {
        super(message);
    }

    public EmptySaltException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmptySaltException(Throwable cause) {
        super(cause);
    }

    public EmptySaltException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
