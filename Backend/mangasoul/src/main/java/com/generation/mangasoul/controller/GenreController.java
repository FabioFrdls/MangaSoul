package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.Genre;
import com.generation.mangasoul.repository.GenreRepository;

@RequestMapping("/api/genres")
@RestController
@CrossOrigin(origins="*")
public class GenreController {
	
	GenreRepository genreRepository;
	
	public GenreController(GenreRepository genreRepository) {
		this.genreRepository = genreRepository;	
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<Genre>> getAll(){
		return ResponseEntity.ok(genreRepository.findAll());
	}
}
