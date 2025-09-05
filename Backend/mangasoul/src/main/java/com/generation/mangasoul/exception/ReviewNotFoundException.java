package com.generation.mangasoul.exception;


@SuppressWarnings("serial")
public class ReviewNotFoundException extends RuntimeException{

	public ReviewNotFoundException() {
		super("Review doesn't exist");
	}
	public ReviewNotFoundException(String message) {
		super(message);
	}
}
