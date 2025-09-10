package com.generation.mangasoul.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.service.AdminService;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

	AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	// USERS ENDPOINTS

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(@RequestHeader("access-token") String token) {

		return ResponseEntity.ok(adminService.getAllUsers(token));
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody User user,
			@RequestHeader("access-token") String token) {

		return ResponseEntity.ok(adminService.updateUser(id, user, token));
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable long id, @RequestHeader("access-token") String token) {

		return ResponseEntity.ok(adminService.deleteUser(id, token));
	}
	
	
	// REVIEW ENDPOINTS
	
	 @GetMapping("/reviews/{id}")
	    public ResponseEntity<List<Map<String, Object>>> getUserReviews(
	            @RequestHeader("access-token") String token,
	            @PathVariable long id) {

	        List<Map<String, Object>> reviews = adminService.getReviewsById(token, id);
	        return ResponseEntity.ok(reviews);
	    }

	// MANGA ENDPOINTS

	@PostMapping("manga/")
	public ResponseEntity<String> createManga(
			@RequestHeader("access-token") String token, 
			@RequestBody Manga manga) {
		
		return ResponseEntity.ok(adminService.createManga(token, manga));
	}

	@PutMapping("manga/{id}")
	public ResponseEntity<String> updateManga(
			@RequestHeader("access-token") String token, 
			@PathVariable long id,
			@RequestBody Manga updatedManga) {
		
		return ResponseEntity.ok(adminService.updateManga(token, id, updatedManga));
	}

	@DeleteMapping("/manga/{id}")
	public ResponseEntity<String> deleteManga(
			@RequestHeader("access-token") String token, 
			@PathVariable long id) {
		
		return ResponseEntity.ok(adminService.deleteManga(token, id));
	}

}
