package io.smsc.exception;

import io.smsc.dto.Message;
import io.smsc.dto.MessageType;
import io.smsc.exception.handler.GenericExceptionHandler;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(PowerMockRunner.class)
@PrepareForTest(GenericExceptionHandler.class)
public class GenericExceptionHandlerUnitTest {

    private GenericExceptionHandler exceptionHandler;
    private Message message1;
    private Message message2;

    @Mock
    private MessageSource messageSource;

    @Mock
    private MessageSourceAccessor messageSourceAccessor;

    @Mock
    private RepositoryConstraintViolationException exception1;

    @Mock
    private DataIntegrityViolationException exception2;

    @Mock
    private Errors errors;

    @Mock
    private FieldError fieldError;

    @Mock
    private ObjectError objectError;

    @Mock
    private Throwable throwable;

    @Before
    public void setup() {
        exceptionHandler = new GenericExceptionHandler(messageSource);
        List<ObjectError> objectErrors = new ArrayList<>();
        objectErrors.add(fieldError);
        objectErrors.add(objectError);

        when(exception1.getErrors()).thenReturn(errors);
        when(exception1.getLocalizedMessage()).thenReturn("LANGUAGE_VALIDATION_FAILED");
        when(errors.getAllErrors()).thenReturn(objectErrors);
        when(fieldError.getDefaultMessage()).thenReturn("DefaultMessage1");
        when(fieldError.getField()).thenReturn("field");
        when(objectError.getDefaultMessage()).thenReturn("DefaultMessage2");
        when(exception1.getCause()).thenReturn(throwable);
        when(exception2.getCause()).thenReturn(throwable);
        when(throwable.getCause()).thenReturn(throwable);
        when(throwable.getMessage()).thenReturn("DefaultCause");

        PowerMockito.spy(exceptionHandler);
        Whitebox.setInternalState(exceptionHandler, "messageSourceAccessor", messageSourceAccessor);
        when(messageSourceAccessor.getMessage("DefaultMessage1")).thenReturn("DefaultMessage1");
        when(messageSourceAccessor.getMessage("DefaultMessage2")).thenReturn("DefaultMessage2");
    }

    @Test
    public void testHandleRepositoryConstraintViolationException() throws Exception {
        message1 = new Message();
        message1.setField("field");
        message1.setMessage("DefaultMessage1");
        message1.setType(MessageType.ERROR);

        message2 = new Message();
        message2.setField(null);
        message2.setMessage("DefaultMessage2");
        message2.setType(MessageType.ERROR);

        ResponseEntity<List<Message>> responseEntity = exceptionHandler.handleConstraintViolationException(exception1);

        verify(exception1, times(1)).getErrors();
        verify(errors, times(1)).getAllErrors();
        verify(fieldError, times(1)).getDefaultMessage();
        verify(fieldError, times(1)).getField();
        verify(objectError, times(1)).getDefaultMessage();

        assertThat(responseEntity.getBody().get(0)).isEqualToComparingFieldByField(message1);
        assertThat(responseEntity.getBody().get(1)).isEqualToComparingFieldByField(message2);
    }

    @Test
    public void testHandleDataIntegrityViolationException() throws Exception {
        message1 = new Message();
        message1.setField(null);
        message1.setMessage("DefaultCause");
        message1.setType(MessageType.ERROR);

        ResponseEntity<Message> responseEntity = exceptionHandler.handleDataIntegrityViolationException(exception2);

        verify(exception2, times(1)).getCause();
        verify(throwable, times(1)).getCause();
        verify(throwable, times(1)).getMessage();

        assertThat(responseEntity.getBody()).isEqualToComparingFieldByField(message1);
    }
}