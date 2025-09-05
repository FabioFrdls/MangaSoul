package com.generation.mangasoul.exception;

@SuppressWarnings("serial")
public class DuplicateParamException extends RuntimeException {
	
	public DuplicateParamException() {
		super("The parameter already exists");
	}

	public DuplicateParamException(String message) {
		super(message);
	}

}
