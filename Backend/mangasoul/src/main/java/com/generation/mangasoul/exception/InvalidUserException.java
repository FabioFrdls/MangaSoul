package com.generation.mangasoul.exception;

@SuppressWarnings("serial")
public class InvalidUserException extends RuntimeException{
	
	public InvalidUserException() {
		super("The access is negated for the user");
	}
	
	public InvalidUserException(String message) {
		super(message);
	}

}
