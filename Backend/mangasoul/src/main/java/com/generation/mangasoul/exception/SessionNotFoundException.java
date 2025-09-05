package com.generation.mangasoul.exception;

public class SessionNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public SessionNotFoundException() {
		super("the session does not exists");
	}
	
	public SessionNotFoundException(String message) {
		super(message);
	}
	

}
