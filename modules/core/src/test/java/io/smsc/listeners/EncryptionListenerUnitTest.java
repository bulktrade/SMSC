package io.smsc.listeners;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class EncryptionListenerUnitTest {

    private Object testObject;

    @Before
    public void setUp() {
        testObject = new Object();
    }

    @Mock
    private EncryptionListener listener;

    @Test(expected = IllegalAccessException.class)
    public void testEncryptCall() throws Exception {
        doThrow(IllegalAccessException.class).when(listener).encrypt(testObject);
        listener.encrypt(testObject);
    }

    @Test(expected = IllegalAccessException.class)
    public void testDecryptCall() throws Exception {
        doThrow(IllegalAccessException.class).when(listener).decrypt(testObject);
        listener.decrypt(testObject);
    }
}
