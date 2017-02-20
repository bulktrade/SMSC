package io.smsc.annotation.admin;

import io.smsc.model.validator.customer.UserConstraintValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UserConstraintValidator.class)
public @interface UserExistsValidator {
    String message() default "validation.admin.username.exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
