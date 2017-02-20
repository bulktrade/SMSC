package io.smsc.model.validator;

import io.smsc.annotation.UserExistsValidator;
import io.smsc.model.admin.User;
import io.smsc.repository.admin.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserConstraintValidator implements ConstraintValidator<UserExistsValidator, User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize(UserExistsValidator constraintAnnotation) {

    }

    @Override
    public boolean isValid(User value, ConstraintValidatorContext context) {
//        User user = (User) target;
//        User databaseUser = userRepository.findByUsername(user.getUsername());
//
//        if (databaseUser != null && !databaseUser.getId().equals(user.getId())) {
//            errors.rejectValue("username", "username.exists.validation");
//        }

        return true;
    }
}
