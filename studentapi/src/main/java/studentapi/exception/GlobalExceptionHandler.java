package studentapi.exception;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;

@ControllerAdvice
public class GlobalExceptionHandler {

@ExceptionHandler(RuntimeException.class)
public ResponseEntity<Map<String,String>> handleException(RuntimeException ex){

Map<String,String> error = new HashMap<>();

error.put("error",ex.getMessage());

return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
}

}