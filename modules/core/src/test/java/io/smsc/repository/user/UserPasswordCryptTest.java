//package io.smsc.repository.user;
//
//import io.smsc.converters.CryptoConverter;
//import io.smsc.model.User;
//import io.smsc.AbstractTest;
//import org.junit.Assert;
//import org.junit.Test;
//
//public class UserPasswordCryptTest extends AbstractTest {
//
////    @Test
////    public void testEncryptDecryptUserPassword(){
////        System.out.println(secretKey);
////        User user = new User(99L,"Old Johnny","john123456","John","Forrester","john@gmail.com",true,false);
////        String encryptedPassword = CryptoConverter.encrypt(user,secretKey);
////        String decryptedPassword = CryptoConverter.decrypt(user,secretKey);
////        System.out.println("Raw password: " + "john123456");
////        System.out.println("Encrypted password: " + encryptedPassword);
////        System.out.println("Salt: " + user.getSalt());
////        System.out.println("Decrypted password: " + decryptedPassword);
////        Assert.assertEquals("john123456",decryptedPassword);
////    }
//}
