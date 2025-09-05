package com.generation.mangasoul.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.service.MangaService;

@RestController
@RequestMapping("/api/manga")
@CrossOrigin(origins = "*")
public class MangaController {
	@Autowired
	MangaService mangaServ;
	@GetMapping("/find")
	public ResponseEntity<?> findManga(){
		return ResponseEntity.ok(mangaServ.findManga());
		}
	@GetMapping("/findWkeyWords")
	public ResponseEntity<?> findByKeyWord(@RequestParam String keywords){
		
		return ResponseEntity.ok(mangaServ.findByKeyWord(keywords));
	}
	

}
