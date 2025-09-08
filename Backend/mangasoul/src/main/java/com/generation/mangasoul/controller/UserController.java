package com.generation.mangasoul.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<String> register(@RequestBody @Valid User user) {
		String response = userService.register(user);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/profile")
	public ResponseEntity<String> profile(@RequestHeader(name = "access-token", required = true) String token) {
		String response = userService.profile(token);
		return ResponseEntity.ok(response);
	}

}
