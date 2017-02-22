package io.smsc.exception.handler;

import io.smsc.dto.Message;
import io.smsc.dto.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.data.rest.webmvc.RepositoryRestExceptionHandler;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice(basePackageClasses = RepositoryRestExceptionHandler.class)
public class GenericExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(GenericExceptionHandler.class);

    private final MessageSourceAccessor messageSourceAccessor;

    public GenericExceptionHandler(MessageSource messageSource) {

        Assert.notNull(messageSource, "MessageSource must not be null!");
        this.messageSourceAccessor = new MessageSourceAccessor(messageSource);
    }

    @ExceptionHandler({RepositoryConstraintViolationException.class})
    ResponseEntity handleConstraintViolationException(RepositoryConstraintViolationException e) {
        List<Message> messages = new ArrayList<>();

        for (FieldError error : e.getErrors().getFieldErrors()) {
            messages.add(new Message(messageSourceAccessor.getMessage(error.getDefaultMessage()), MessageType.ERROR, error.getField()));
        }

        return new ResponseEntity(messages, new HttpHeaders(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    ResponseEntity handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        List<Message> messages = new ArrayList<>();
        messages.add(new Message(e.getCause().getCause().getClass().getSimpleName(), MessageType.ERROR, null));

        return new ResponseEntity(messages, new HttpHeaders(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    ResponseEntity handle(Exception e) {
        return new ResponseEntity("Some message", new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
