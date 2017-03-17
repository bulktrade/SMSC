package io.smsc.listeners;

import io.smsc.util.EncrypterUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.util.ReflectionTestUtils;

import java.awt.event.ActionEvent;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class EncryptionListenerUnitTest {

    private Object testObject;

    private EncryptionListener listener;

    private ActionEvent mockEvent;

    @Mock
    private EncryptionListener mockListener;

    @Before
    public void setUp() {
        listener = new EncryptionListener();
        testObject = new Object();
        mockEvent = mock(ActionEvent.class);

        ReflectionTestUtils.setField(EncrypterUtil.class, "secretKey", "smsc.io");
    }

    @Test(expected = IllegalAccessException.class)
    public void testEncryptCallWithException() throws Exception {
        doThrow(IllegalAccessException.class).when(mockListener).encrypt(testObject);

        mockListener.encrypt(testObject);
    }

    @Test(expected = IllegalAccessException.class)
    public void testDecryptCallWithException() throws Exception {
        doThrow(IllegalAccessException.class).when(mockListener).decrypt(testObject);

        mockListener.decrypt(testObject);
    }

    @Test
    public void testEncryptCallWithoutException() throws Exception {
        mockListener.encrypt(testObject);

        verify(mockListener).encrypt(testObject);
    }

    @Test
    public void testDecryptCallWithoutException() throws Exception {
        mockListener.decrypt(testObject);

        verify(mockListener).decrypt(testObject);
    }

    @Test
    public void testEncryptCall() throws Exception {
        listener.encrypt(mockEvent);
    }

    @Test
    public void testDecryptCall() throws Exception {
        listener.decrypt(mockEvent);
    }
}
