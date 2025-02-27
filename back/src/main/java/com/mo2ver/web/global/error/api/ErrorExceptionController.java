package com.mo2ver.web.global.error.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.mo2ver.web.global.error.dto.ErrorFieldInfo;
import com.mo2ver.web.global.error.dto.ErrorFieldTypeInfo;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ErrorExceptionController {

    private final ErrorHandler errorHandler;

    /**
     * Restful API 통신시, 내부 Runtime 에러
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleRuntimeException(RuntimeException e) {
        Throwable throwable = e.getCause();
        if (throwable instanceof ExpiredJwtException) {
            return this.getExpiredJwtException((ExpiredJwtException) throwable);
        }
        return errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getExpiredJwtException(ExpiredJwtException e) {
        return errorHandler.buildError(ErrorCode.TOKEN_ACCESS_DENIED, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    /**
     * 지원하지 않은 HTTP Method 호출 할 경우 발생
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return errorHandler.buildError(ErrorCode.METHOD_NOT_ALLOWED, ErrorInfo.builder()
                .supported(e.getSupportedMethods())
                .unsupported(e.getMethod())
                .build());
    }

    /**
     * 지원하지 않은 HTTP Content Type 호출 할 경우 발생
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    public ErrorResponse handleHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {
        return errorHandler.buildError(ErrorCode.UNSUPPORTED_MEDIA_TYPE, ErrorInfo.builder()
                .supported(e.getSupportedMediaTypes())
                .unsupported(e.getContentType())
                .build());
    }

    /**
     * Restful API 통신시, 파라미터 유효성 검사 실패
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        return errorHandler.buildError(ErrorCode.HANDLE_ACCESS_DENIED, ErrorInfo.builder()
                .message("유효성 검사 실패")
                .errors(fieldErrors.stream()
                        .map(ErrorFieldInfo::of)
                        .collect(Collectors.toList()))
                .build());
    }

    /**
     * Restful API 통신시, 파라미터가 다른경우 발생함
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        Throwable throwable = e.getMostSpecificCause();
        if (throwable instanceof JsonParseException) {
            return this.getJsonParseException((JsonParseException) throwable);
        } else if (throwable instanceof UnrecognizedPropertyException) {
            return this.getUnrecognizedPropertyException((UnrecognizedPropertyException) throwable);
        } else if (throwable instanceof InvalidFormatException) {
            return this.getInvalidFormatException((InvalidFormatException) throwable);
        }
        return errorHandler.buildError(ErrorCode.HANDLE_ACCESS_DENIED, ErrorInfo.builder()
                .exceptionName(throwable.getClass().getName())
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getJsonParseException(JsonParseException e) {
        return errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getUnrecognizedPropertyException(UnrecognizedPropertyException e) {
        return errorHandler.buildError(ErrorCode.INPUT_KEY_INVALID, ErrorInfo.builder()
                .supported(e.getKnownPropertyIds())
                .unsupported(e.getPropertyName())
                .build());
    }

    private ErrorResponse getInvalidFormatException(InvalidFormatException e) {
        return errorHandler.buildError(ErrorCode.INPUT_VALUE_INVALID, ErrorInfo.builder()
                .supported(ErrorFieldTypeInfo.of(e.getTargetType().getSimpleName()))
                .unsupported(ErrorFieldTypeInfo.of(e.getValue().getClass().getSimpleName(), e.getValue()))
                .build());
    }

    /**
     * Restful API 통신시, 내부 JSON 포멧 동작 에러
     */
    @ExceptionHandler(HttpMessageNotWritableException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleHttpMessageNotWritableException(HttpMessageNotWritableException e) {
        Throwable throwable = e.getMostSpecificCause();
        if (throwable instanceof JsonMappingException) {
            return this.getJsonMappingException((JsonMappingException) throwable);
        } else if (throwable instanceof IllegalStateException) {
            return this.getIllegalStateException((IllegalStateException) throwable);
        }
        return errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                .exceptionName(throwable.getClass().getName())
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getJsonMappingException(JsonMappingException e) {
        return errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getIllegalStateException(IllegalStateException e) {
        return errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    /**
     * Restful API 통신시, 내부 Repository 값 파싱 에러
     */
    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleInvalidDataAccessApiUsageException(InvalidDataAccessApiUsageException e) {
        Throwable throwable = e.getMostSpecificCause();
        if (throwable instanceof IllegalArgumentException) {
            return this.getIllegalArgumentException((IllegalArgumentException) throwable);
        }
        return errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                .exceptionName(throwable.getClass().getName())
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getIllegalArgumentException(IllegalArgumentException e) {
        return errorHandler.buildError(ErrorCode.REPOSITORY_MAPPING_INVALID, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    /**
     * Restful API 통신시, 내부 SQL Result 에러
     */
    @ExceptionHandler(IncorrectResultSizeDataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleIncorrectResultSizeDataAccessException(IncorrectResultSizeDataAccessException e) {
        Throwable throwable = e.getMostSpecificCause();
        if (throwable instanceof NonUniqueResultException) {
            return this.getNonUniqueResultException((NonUniqueResultException) throwable);
        }
        return errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                .exceptionName(throwable.getClass().getName())
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getNonUniqueResultException(NonUniqueResultException e) {
        return errorHandler.buildError(ErrorCode.DATA_MOT_FOUND, ErrorInfo.builder()
                .message(e.getMessage())
                .build());
    }

    /**
     * Restful API 통신시, 내부 SQL 쿼리 동작 에러
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        Throwable throwable = e.getMostSpecificCause();
        if (throwable instanceof SQLException) {
            return this.getSQLException((SQLException) throwable);
        } else if (throwable instanceof ConstraintViolationException) {
            return this.getConstraintViolationException((ConstraintViolationException) throwable);
        }
        return errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                .exceptionName(throwable.getClass().getName())
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getSQLException(SQLException e) {
        return errorHandler.buildError(ErrorCode.SQL_QUERY_INVALID, ErrorInfo.builder()
                .errcode(String.valueOf(e.getErrorCode()))
                .message(e.getMessage())
                .build());
    }

    private ErrorResponse getConstraintViolationException(ConstraintViolationException e) {
        return errorHandler.buildError(ErrorCode.SQL_QUERY_INVALID, ErrorInfo.builder()
                .errcode(String.valueOf(e.getErrorCode()))
                .message(e.getMessage())
                .build());
    }
}
