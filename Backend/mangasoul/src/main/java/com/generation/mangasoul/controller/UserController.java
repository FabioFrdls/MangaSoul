package com.generation.mangasoul.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.User;
import com.generation.mangasoul.service.UserService;
import com.generation.mangasoul.utility.UserDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

	UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody UserDto userDto) {
		Map<String, String> response = userService.login(userDto);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader(name = "access-token", required = true) String token) {
		String response = userService.logout(token);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody @Valid User user) {
		User response = userService.register(user);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/profile")
	public ResponseEntity<String> profile(@RequestHeader(name = "access-token", required = true) String token) {
		String response = userService.profile(token);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/stats")
	public ResponseEntity<Map<String, Object>> getStats(
			@RequestHeader(name = "access-token", required = true) String token) {

		return ResponseEntity.ok(userService.getUserStats(token));

	}

	@GetMapping("/stats/{username}")
	public ResponseEntity<Map<String, Object>> getUserStats(@PathVariable String username) {
		return ResponseEntity.ok(userService.getUserStatsByUsername(username));
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(userService.getUsers());
	}

	@PutMapping("/update")
	public ResponseEntity<User> updateUser(@RequestHeader(name = "access-token") String token, @RequestBody @Valid User user) {
		return ResponseEntity.ok(userService.updateUser(token, user));
	}

}
