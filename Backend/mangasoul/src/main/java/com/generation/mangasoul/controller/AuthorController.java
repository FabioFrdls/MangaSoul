package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.generation.mangasoul.model.Author;
import com.generation.mangasoul.service.AuthorService;

@Controller
@RequestMapping("/api/author")
@CrossOrigin(origins = "*")
public class AuthorController {

	private AuthorService autoreService;
	
	public AuthorController(AuthorService autoreService) {
		this.autoreService = autoreService;
	}

	@GetMapping("/findByFullName")
	public ResponseEntity<List<Author>> findByFullName(@RequestParam String fullName) {

		List<Author> authorList = autoreService.findByFullName(fullName);
		
		if (authorList.isEmpty()) {
			
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(authorList);
	}

	@PostMapping("/insert")
	public ResponseEntity<String> insertReview(@RequestBody Author a) {

		autoreService.postAuthor(a);

		return ResponseEntity.ok("Author posted successfully");
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Author>> getAllReviews() {

		List<Author> reviewList = autoreService.getAll();

		// I'm using isEmpty() because the list can never be null
		if (reviewList.isEmpty()) {

			// *List exist, but could be empty so noContent is better than notFound
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(reviewList);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Author> getReviewById(@PathVariable long id) {

		if (autoreService.getById(id) != null) {
			return ResponseEntity.ok(autoreService.getById(id));
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@PutMapping("/updateById/{id}")
	public ResponseEntity<Author> updateById(@PathVariable long id, @RequestBody Author a) {

		a.setId(id);
		autoreService.updateAuthorById(a);
		return ResponseEntity.ok(a);

	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {

		autoreService.deleteAuthorById(id);
		return ResponseEntity.ok("Review successfully deleted");

	}
}
