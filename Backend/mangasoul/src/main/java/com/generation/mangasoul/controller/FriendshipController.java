package com.generation.mangasoul.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.mangasoul.model.Friendship;
import com.generation.mangasoul.service.FriendshipService;

@RestController
@RequestMapping("api/friendship/")
@CrossOrigin(origins = "*")
public class FriendshipController {

	private FriendshipService friendshipService;

	public FriendshipController(FriendshipService friendshipService) {
		this.friendshipService = friendshipService; // TODO Auto-generated constructor stub
	}

	@GetMapping("/getFriends")
	public ResponseEntity<List<Map<String, Object>>> getFriends(
			 @RequestHeader(name = "access-token", required = true) String token) {
		return ResponseEntity.ok(friendshipService.getFriends(token));
	}

	@GetMapping("/pending")
	public ResponseEntity<List<Friendship>> getPendingRequests(
			 @RequestHeader(name = "access-token", required = true) String token) {
		return ResponseEntity.ok(friendshipService.getPendingRequests(token));
	}

	@PostMapping("/send/{friendId}")
	public ResponseEntity<Friendship> sendRequest(
			 @RequestHeader(name = "access-token", required = true) String token, 
			@PathVariable long friendId) {
		
		return ResponseEntity.ok(friendshipService.sendRequest(token, friendId));
	}
	
	 @PostMapping("/accept/{requestId}")
	 public ResponseEntity<Friendship> acceptRequest(
			 @RequestHeader(name = "access-token", required = true) String token,
	            @PathVariable long requestId) {
	        
	    return ResponseEntity.ok(friendshipService.acceptRequest(token, requestId));
	}

}
