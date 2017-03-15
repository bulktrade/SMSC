package io.smsc.service.encryption;

import io.smsc.annotation.Encrypt;

class EncryptionTestClassWithPublicFieldAndSalt {

    @Encrypt
    public String fieldToBeEncoded;

    public String salt;

    public String getFieldToBeEncoded() {
        return fieldToBeEncoded;
    }

    public void setFieldToBeEncoded(String fieldToBeEncoded) {
        this.fieldToBeEncoded = fieldToBeEncoded;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
