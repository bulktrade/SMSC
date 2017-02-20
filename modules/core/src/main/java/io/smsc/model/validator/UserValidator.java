package io.smsc.model.validator;

import io.smsc.model.admin.User;
import io.smsc.repository.admin.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        User databaseUser = userRepository.findByUsername(user.getUsername());

        if (databaseUser != null && !databaseUser.getId().equals(user.getId())) {
            errors.rejectValue("username", "username.exists.validation");
        }
    }
}
