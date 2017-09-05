package io.smsc.config;

import io.smsc.dto.Message;
import io.smsc.dto.MessageType;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RepositoryConstraintViolationException.class)
    public ResponseEntity<List<Message>> handleRepositoryConstraintViolationException(
            Exception ex) throws IOException {
        RepositoryConstraintViolationException nevEx = (RepositoryConstraintViolationException) ex;
        List<Message> errors = new ArrayList<>();
        for(ObjectError error : nevEx.getErrors().getAllErrors()) {
            Message message = new Message();
            message.setType(MessageType.ERROR);
            message.setField(error.getCodes()[0]);
            message.setMessage(error.getDefaultMessage());

            errors.add(message);
        }

        return new ResponseEntity<>(errors, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
