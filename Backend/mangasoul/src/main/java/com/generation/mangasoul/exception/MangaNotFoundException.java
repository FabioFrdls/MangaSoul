package com.generation.mangasoul.exception;

public class MangaNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public  MangaNotFoundException() {
		super("the manga does not exists");
	}
	
	public MangaNotFoundException(String message) {
		super(message);
	}

}
