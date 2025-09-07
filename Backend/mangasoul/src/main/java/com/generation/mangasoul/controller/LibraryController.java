package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	
	// In front end I writed only the fetch for findAll method, so the other methods will be avaible in the next pushes
	// to use the library you need to link authentication1.js in login.html
	// also for now, you need to manually insert the items in the library table. Run the file lib_insert in database folder
	
	@PostMapping
	public ResponseEntity<String> insert(@RequestHeader("Authorization") String token, @RequestBody Manga manga,
			@RequestParam(defaultValue = "") String status, @RequestParam(defaultValue = "no") String favourite){
		Long userId = libraryService.getUserIdFromToken(token);
		libraryService.insert(userId, manga, status, favourite);
		return ResponseEntity.ok("Manga added to your library");
	}
	
	@GetMapping
	public ResponseEntity<List<MangaDto>> findAll(@RequestHeader("Authorization") String token){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findAll(userId));
	}
	
	@GetMapping("key/{keyWord}")
	public ResponseEntity<List<MangaDto>> findByKeyWord(@RequestHeader("Authorization") String token, @PathVariable String keyWord){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findByKeyWord(userId, keyWord));
	}
	
	@GetMapping("/status/{status}")
	public ResponseEntity<List<MangaDto>> findByStatus(@RequestHeader("Authorization") String token, @PathVariable String status){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findByStatus(userId, status));
	}
	
	@GetMapping("/fav/{favourite}")
	public ResponseEntity<List<MangaDto>> findByFav(@RequestHeader("Authorization") String token, @PathVariable String favourite){
		Long userId = libraryService.getUserIdFromToken(token);
		return ResponseEntity.ok(libraryService.findByFav(userId, favourite));
	}
	
	@PutMapping
	public ResponseEntity<String> update(@RequestHeader("Authorization") String token, @RequestParam long mangaId, 
			@RequestParam(defaultValue = "") String status, @RequestParam(defaultValue = "no") String favourite){
		Long userId = libraryService.getUserIdFromToken(token);	
		libraryService.update(userId, mangaId, status, favourite);
		return ResponseEntity.ok("Manga updated");
	}
	
	
}
