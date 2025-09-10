package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.service.MangaService;

@RestController
@RequestMapping("/api/manga")
@CrossOrigin(origins = "*")
public class MangaController {

	
	MangaService mangaServ;

	public MangaController(MangaService mangaServ) {
		this.mangaServ = mangaServ;
	}
	
	@GetMapping("/find")
	public ResponseEntity<List<Manga>> findManga() {
		return ResponseEntity.ok(mangaServ.findManga());
	}

	@GetMapping("/findWkeyWords")
	public ResponseEntity<List<Manga>> findByKeyWord(@RequestParam String keywords) {
		return ResponseEntity.ok(mangaServ.findByKeyWord(keywords));
	}
	
	@GetMapping("/top")
	public ResponseEntity<List<Manga>> getTop(){
		return ResponseEntity.ok(mangaServ.getTop());
	}

}
