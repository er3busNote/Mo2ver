package com.mo2ver.web.global.common.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class ListSizeValidator implements ConstraintValidator<MinListSize, List<?>> {

    private int minSize;

    @Override
    public void initialize(MinListSize constraintAnnotation) {
        this.minSize = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(List<?> value, ConstraintValidatorContext context) {
        return value != null && value.size() >= minSize;
    }
}
