package com.generation.mangasoul.exception;

@SuppressWarnings("serial")
public class LoginException extends RuntimeException {

	public LoginException() {
		super("Invalid username or password");
	}
	
	public LoginException(String message) {
		super(message);
	}
    
}