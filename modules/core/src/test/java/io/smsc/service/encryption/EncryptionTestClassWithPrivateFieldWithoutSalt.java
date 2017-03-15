package io.smsc.service.encryption;

import io.smsc.annotation.Encrypt;

class EncryptionTestClassWithPrivateFieldWithoutSalt {

    @Encrypt
    private String fieldToBeEncoded;

    public String getFieldToBeEncoded() {
        return fieldToBeEncoded;
    }

    public void setFieldToBeEncoded(String fieldToBeEncoded) {
        this.fieldToBeEncoded = fieldToBeEncoded;
    }
}
