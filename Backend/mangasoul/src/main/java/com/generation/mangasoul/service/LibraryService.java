package com.generation.mangasoul.service;

import java.util.List;

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.repository.LibraryRepository;

public class LibraryService {
	
	private LibraryRepository libraryRepository;

	public LibraryService(LibraryRepository libraryRepository) {
		super();
		this.libraryRepository = libraryRepository;
	}
	
	public List<Manga> findByStatus(String status){
		return libraryRepository.findByStatus(status);
	}
	
	public List<Manga> findByFav(String fav){
		return libraryRepository.findByFav(fav);
	}
}
