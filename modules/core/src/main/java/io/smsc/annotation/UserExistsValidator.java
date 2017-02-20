package io.smsc.annotation;

import io.smsc.model.validator.UserConstraintValidator;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
@Constraint(validatedBy = UserConstraintValidator.class)
public @interface UserExistsValidator {
    String message() default "username.exists.validation";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
