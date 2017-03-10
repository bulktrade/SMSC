package io.smsc.dto;

public class Message {
    private String message;
    private MessageType type;
    private String field;

    public Message(String message, MessageType type, String field) {
        this.message = message;
        this.type = type;
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
