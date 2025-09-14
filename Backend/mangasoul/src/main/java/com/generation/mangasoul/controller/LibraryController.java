package com.generation.mangasoul.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.Library;
import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.service.LibraryService;
import com.generation.mangasoul.utility.MangaDto;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class LibraryController {
	
	@Autowired
	private LibraryService libraryService;
	

	public LibraryController(LibraryService libraryService) {
		super();
		this.libraryService = libraryService;
	}
	
	/* we don't need exceptions control in these methods, since User and Manga object are taken from the page 
	automatically, not from the user, while status and favourite are always optional parameters
	*/
	
	// this class is still work in progress, the methods filter, update and delete are not tested yet, since the frontedn is not complete 
	// also for now, you need to manually insert the items in the library table. Run the file lib_insert in database folder
	
	@PostMapping
	public ResponseEntity<String> insert(@RequestHeader("Authorization") String token, @RequestBody Manga manga){
		Long userId = libraryService.getUserIdFromToken(token);
		libraryService.insert(userId, manga);
		return ResponseEntity.ok("Manga added to your library");
	}
	
	@GetMapping
	public ResponseEntity<List<MangaDto>> findAll(@RequestHeader("Authorization") String token){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findAll(userId));
	}
	
	@GetMapping("/id/{mangaId}")
	public Library findById(@RequestHeader("Authorization") String token, @PathVariable long mangaId){
		Long userId = libraryService.getUserIdFromToken(token);
		return libraryService.findById(userId, mangaId);
	}
	
	@GetMapping("/key/{keyWord}")
	public ResponseEntity<List<MangaDto>> findByKeyWord(@RequestHeader("Authorization") String token, @PathVariable String keyWord){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findByKeyWord(userId, keyWord));
	}
	
	
	@GetMapping("/filter")
		public ResponseEntity<List<MangaDto>> findByStatOrFav(@RequestHeader("Authorization") String token, 
				 @RequestParam(defaultValue = "") String status, @RequestParam(defaultValue = "") String fav) {
		Long userId = libraryService.getUserIdFromToken(token);
		if(!"".equals(status) && !"".equals(fav))
			return ResponseEntity.ok(libraryService.findByStatAndFav(userId, status, fav));
		else if(!"".equals(status))
			return ResponseEntity.ok(libraryService.findByStatus(userId, status));
		else if(!"".equals(fav))
			return ResponseEntity.ok(libraryService.findByFav(userId, fav));
		return ResponseEntity.ok(libraryService.findAll(userId));
	}
	
	
	@PutMapping("/id/{mangaId}")
	public ResponseEntity<String> update(@RequestHeader("Authorization") String token, @PathVariable long mangaId, 
			@RequestParam(defaultValue = "") String status, @RequestParam(defaultValue = "no") String fav){
		Long userId = libraryService.getUserIdFromToken(token);	
		libraryService.update(userId, mangaId, status, fav);
		return ResponseEntity.ok("Manga updated");
	}
	
	@DeleteMapping("/id/{mangaId}")
	public ResponseEntity<String> delete(@RequestHeader("Authorization") String token, @PathVariable long mangaId){
		Long userId = libraryService.getUserIdFromToken(token);
		libraryService.delete(userId, mangaId);
		return ResponseEntity.ok("Manga deleted");
	}
	
	
	
	
	
	/*
	 * For fabio i need a new endpoint to get the libraries
	 * using the user id without authorization 
	 * 
	 * Pio
	 * 
	 * */
	@GetMapping("/getByUserId/{id}")
	public ResponseEntity<List<MangaDto>> getByUserId(@PathVariable long id){
		return ResponseEntity.ok(libraryService.findAll(id));
	}
	
}
