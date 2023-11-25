package com.mo2ver.master.global.error.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.mo2ver.master.global.error.service.ErrorService;
import com.mo2ver.master.global.error.domain.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NonUniqueResultException;
import java.sql.SQLException;
import java.util.HashMap;

@Slf4j
@ControllerAdvice
@ResponseBody
public class ErrorExceptionController {

    private final ErrorService errorService;

    public ErrorExceptionController(ErrorService errorService) {
        this.errorService = errorService;
    }

    /**
     * 지원하지 않은 HTTP Method 호출 할 경우 발생
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    protected ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("unsupported", e.getMethod());
        message.put("supported", e.getSupportedMethods());
        return errorService.buildError(ErrorCode.METHOD_NOT_ALLOWED, message);
    }

    /**
     * 지원하지 않은 HTTP Content Type 호출 할 경우 발생
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    protected ErrorResponse handleHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("unsupported", e.getContentType());
        message.put("supported", e.getSupportedMediaTypes());
        return errorService.buildError(ErrorCode.UNSUPPORTED_MEDIA_TYPE, message);
    }

    /**
     * Restful API 통신시, 파라미터가 다른경우 발생함
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        Throwable throwable = e.getMostSpecificCause();
        HashMap<String, Object> message = new HashMap<>();
        if (throwable instanceof JsonParseException) {
            return getJsonParseException((JsonParseException) throwable);
        } else if (throwable instanceof UnrecognizedPropertyException) {
            return getUnrecognizedPropertyException((UnrecognizedPropertyException) throwable);
        } else if (throwable instanceof InvalidFormatException) {
            return getInvalidFormatException((InvalidFormatException) throwable);
        } else {
            if (throwable != null) {
                message.put("exceptionName", throwable.getClass().getName());
                message.put("message", throwable.getMessage());
            } else {
                message.put("message", e.getMessage());
            }
        }
        return errorService.buildError(ErrorCode.HANDLE_ACCESS_DENIED, message);
    }

    private ErrorResponse getJsonParseException(JsonParseException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, message);
    }

    private ErrorResponse getUnrecognizedPropertyException(UnrecognizedPropertyException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("unsupported", e.getPropertyName());
        message.put("supported", e.getKnownPropertyIds());
        return errorService.buildError(ErrorCode.INPUT_KEY_INVALID, message);
    }

    private ErrorResponse getInvalidFormatException(InvalidFormatException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("unsupported", new HashMap<String, Object>(){{
            put("fieldType", e.getValue().getClass().getSimpleName());
            put("fieldValue", e.getValue());
        }});
        message.put("supported", new HashMap<String, Object>(){{
            put("fieldType", e.getTargetType().getSimpleName());
        }});
        return errorService.buildError(ErrorCode.INPUT_VALUE_INVALID, message);
    }

    /**
     * Restful API 통신시, 내부 JSON 포멧 동작 에러
     */
    @ExceptionHandler(HttpMessageNotWritableException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse handleHttpMessageNotWritableException(HttpMessageNotWritableException e) {
        Throwable throwable = e.getMostSpecificCause();
        HashMap<String, Object> message = new HashMap<>();
        if (throwable instanceof JsonMappingException) {
            return getJsonMappingException((JsonMappingException) throwable);
        } else if (throwable instanceof IllegalStateException) {
            return getIllegalStateException((IllegalStateException) throwable);
        } else {
            if (throwable != null) {
                message.put("exceptionName", throwable.getClass().getName());
                message.put("message", throwable.getMessage());
            } else {
                message.put("message", e.getMessage());
            }
        }
        return errorService.buildError(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }

    private ErrorResponse getJsonMappingException(JsonMappingException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, message);
    }

    private ErrorResponse getIllegalStateException(IllegalStateException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, message);
    }

    /**
     * Restful API 통신시, 내부 Repository 값 파싱 에러
     */
    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse handleInvalidDataAccessApiUsageException(InvalidDataAccessApiUsageException e) {
        Throwable throwable = e.getMostSpecificCause();
        HashMap<String, Object> message = new HashMap<>();
        if (throwable instanceof IllegalArgumentException) {
            return getIllegalArgumentException((IllegalArgumentException) throwable);
        } else {
            if (throwable != null) {
                message.put("exceptionName", throwable.getClass().getName());
                message.put("message", throwable.getMessage());
            } else {
                message.put("message", e.getMessage());
            }
        }
        return errorService.buildError(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }

    private ErrorResponse getIllegalArgumentException(IllegalArgumentException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.REPOSITORY_MAPPING_INVALID, message);
    }

    /**
     * Restful API 통신시, 내부 SQL Result 에러
     */
    @ExceptionHandler(IncorrectResultSizeDataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse handleIncorrectResultSizeDataAccessException(IncorrectResultSizeDataAccessException e) {
        Throwable throwable = e.getMostSpecificCause();
        HashMap<String, Object> message = new HashMap<>();
        if (throwable instanceof NonUniqueResultException) {
            return getNonUniqueResultException((NonUniqueResultException) throwable);
        } else {
            if (throwable != null) {
                message.put("exceptionName", throwable.getClass().getName());
                message.put("message", throwable.getMessage());
            } else {
                message.put("message", e.getMessage());
            }
        }
        return errorService.buildError(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }

    private ErrorResponse getNonUniqueResultException(NonUniqueResultException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.DATA_MOT_FOUND, message);
    }

    /**
     * Restful API 통신시, 내부 SQL 쿼리 동작 에러
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        Throwable throwable = e.getMostSpecificCause();
        HashMap<String, Object> message = new HashMap<>();
        if (throwable instanceof SQLException) {
            return getSQLException((SQLException) throwable);
        } else if (throwable instanceof ConstraintViolationException) {
            return getConstraintViolationException((ConstraintViolationException) throwable);
        } else {
            if (throwable != null) {
                message.put("exceptionName", throwable.getClass().getName());
                message.put("message", throwable.getMessage());
            } else {
                message.put("message", e.getMessage());
            }
        }
        return errorService.buildError(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }

    private ErrorResponse getSQLException(SQLException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("errcode", e.getErrorCode());
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.SQL_QUERY_INVALID, message);
    }

    private ErrorResponse getConstraintViolationException(ConstraintViolationException e) {
        HashMap<String, Object> message = new HashMap<>();
        message.put("errcode", e.getErrorCode());
        message.put("message", e.getMessage());
        return errorService.buildError(ErrorCode.SQL_QUERY_INVALID, message);
    }
}
