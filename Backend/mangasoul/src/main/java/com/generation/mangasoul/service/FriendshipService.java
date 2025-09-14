package com.generation.mangasoul.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.InvalidUserException;
import com.generation.mangasoul.exception.SessionNotFoundException;
import com.generation.mangasoul.model.Friendship;
import com.generation.mangasoul.model.Session;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.FriendshipRepository;
import com.generation.mangasoul.repository.SessionRepository;
import com.generation.mangasoul.repository.UserRepository;

@Service
public class FriendshipService {

	FriendshipRepository friendshipRepository;
	UserRepository userRepository;
	SessionRepository sessionRepository;
	UserService userService;

	public FriendshipService(
			FriendshipRepository friendshipRepository, 
			UserRepository userRepository,
			SessionRepository sessionRepository,
			UserService userService) {
		
		this.friendshipRepository = friendshipRepository;
		this.userRepository = userRepository;
		this.sessionRepository = sessionRepository;
		this.userService = userService;
	}

	// send friend request
	// accept friend request
	// reject frined request
	// get friends by user
	// get pending requests

	/*
	 * I use this method to get all the friends associated with an user by using his
	 * token
	 * 
	 * validation bla bla bla, it was better if it was a single method,
	 * take all the friend list with friend stats
	 */
	public List<Map<String, Object>> getFriends(String token) {
		Session session = sessionRepository.findByToken(token)
				.orElseThrow(() -> new SessionNotFoundException());

		User user = userRepository.findById(session.getUserId())
				.orElseThrow(() -> new InvalidUserException());

		List<Friendship> friendships = friendshipRepository
				.findByUserAndStatus(user, "accettata");

		List<Map<String, Object>> mapList = new ArrayList<Map<String,Object>>();
		
		
		friendships.forEach((friendship) -> {
			mapList.add(userService.getFriendStats(friendship.getFriend().getId()));
		});
				
		return mapList;
	}

	/*
	 * this method allow the user to send a request to a negrps another user*
	 * 
	 * it does his controls and validations and finally save the request on the
	 * database
	 */
	public Friendship sendRequest(String token, long friendId) {
		Session session = sessionRepository.findByToken(token)
				.orElseThrow(() -> new SessionNotFoundException());

		User user = userRepository.findById(session.getUserId())
				.orElseThrow(() -> new InvalidUserException());

		if (user.getId() == friendId)
			throw new RuntimeException("You can't be friend with yourself");

		User friend = userRepository.findById(friendId)
				.orElseThrow(() -> new InvalidUserException("Friend doesn't exists"));

		boolean exists = friendshipRepository.findByUserAndFriend(user, friend).isPresent();
		if (exists)
			throw new RuntimeException("You have already send a request to this user");

		Friendship friendship = new Friendship();

		friendship.setUser(user);
		friendship.setFriend(friend);
		friendship.setStatus("in sospeso");
		friendshipRepository.save(friendship);

		return friendship;

	}

	/*
	 * This method allow the user to accept a pending request
	 * and add him on the friend list
	 * 
	 * it does his controls and validations and finally save the request on the
	 * database
	 */
	public Friendship acceptRequest(String token, long id) {
		Session session = sessionRepository.findByToken(token)
				.orElseThrow(() -> new SessionNotFoundException());

		User user = userRepository.findById(session.getUserId())
				.orElseThrow(() -> new InvalidUserException());

		Friendship friendship = friendshipRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("the request doesn't exsists"));

		 // ✅ DOVREBBE ESSERE:
	    if (friendship.getFriend().getId() != user.getId()) {
	        throw new RuntimeException("You are not allowed to accept this request");
	    }

		friendship.setStatus("accettata");
		friendshipRepository.save(friendship);

		Friendship inverse = new Friendship();
		inverse.setUser(friendship.getFriend());
		inverse.setFriend(friendship.getUser());
		inverse.setStatus("accettata");

		friendshipRepository.save(inverse);

		return friendship;
	}
	
	
	public List<Friendship> getPendingRequests(String token) {
	    Session session = sessionRepository.findByToken(token)
	            .orElseThrow(() -> new SessionNotFoundException());

	    User user = userRepository.findById(session.getUserId())
	            .orElseThrow(() -> new InvalidUserException());


	    return friendshipRepository.findByFriendAndStatus(user, "in sospeso");
	}
	
	
	

	

}
