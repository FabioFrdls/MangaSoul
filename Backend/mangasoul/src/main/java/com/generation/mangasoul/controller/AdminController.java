package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.User;
import com.generation.mangasoul.service.UserService;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

	UserService userService;

	public AdminController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(
			@RequestHeader("access-token") String token) {
		
		return ResponseEntity.ok(userService.getAllUsers(token));
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<String> updateUser(
			@PathVariable long id, 
			@RequestBody User user,
			@RequestHeader("access-token") String token) {
		
		return ResponseEntity.ok(userService.updateUser(id, user, token));
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(
			@PathVariable long id, 
			@RequestHeader("access-token") String token) {
		
		return ResponseEntity.ok(userService.deleteUser(id, token));
	}

}
