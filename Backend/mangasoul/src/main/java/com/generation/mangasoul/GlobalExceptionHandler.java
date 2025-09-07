package com.generation.mangasoul;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.generation.mangasoul.exception.DuplicateParamException;
import com.generation.mangasoul.exception.InvalidUserException;
import com.generation.mangasoul.exception.LoginException;
import com.generation.mangasoul.exception.ReviewNotFoundException;
import com.generation.mangasoul.exception.SessionNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler  extends ResponseEntityExceptionHandler{
	
	
	// exception handler for validation errors
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex,   																								// i dettagli																							// degli errori
			HttpHeaders headers, 		
			HttpStatusCode status, 		
			WebRequest request) { 		
	
		Map<String, String> errors = new HashMap<>();
	
		ex.getBindingResult().getFieldErrors().forEach(error -> {
			String field = error.getField(); 								
			String message = error.getDefaultMessage(); 					
			errors.put(field, message); 									
		});
		
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("status", status.value()); 								
		body.put("errors", errors); 										
	
		return ResponseEntity.status(status).body(body);
	}
	
	
	@ExceptionHandler({
		DuplicateParamException.class,
		InvalidUserException.class,
		LoginException.class,
		ReviewNotFoundException.class,
		SessionNotFoundException.class,
		EntityNotFoundException.class
	})
	public ResponseEntity<Object> handleCustomException(RuntimeException ex){
		Map<String, Object> error = new HashMap<String, Object>();
		
		int status = 400;
		
		if(ex instanceof SessionNotFoundException|| 
				ex instanceof ReviewNotFoundException ||
				ex instanceof EntityNotFoundException) {
			status = 404;
		}
		
		else if(ex instanceof InvalidUserException
				|| ex instanceof DuplicateParamException 
				|| ex instanceof LoginException) {
			status = 401;
		}
		
		
		error.put("status", status);
		error.put("message", ex.getMessage());
		
		return ResponseEntity.status(status).body(error);
	}

}
