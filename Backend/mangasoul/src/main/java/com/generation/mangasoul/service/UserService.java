package com.generation.mangasoul.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.DuplicateParamException;
import com.generation.mangasoul.exception.InvalidUserException;
import com.generation.mangasoul.exception.LoginException;
import com.generation.mangasoul.exception.SessionNotFoundException;
import com.generation.mangasoul.model.Friendship;
import com.generation.mangasoul.model.Library;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.Session;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.FriendshipRepository;
import com.generation.mangasoul.repository.LibraryRepository;
import com.generation.mangasoul.repository.ReviewRepository;
import com.generation.mangasoul.repository.SessionRepository;
import com.generation.mangasoul.repository.UserRepository;
import com.generation.mangasoul.utility.UserDto;

import jakarta.transaction.Transactional;

@Service
public class UserService {

	private UserRepository userRepo;
	private SessionRepository sessionRepo;
	private LibraryRepository libraryRepo;
	private ReviewRepository reviewRepo;
	private FriendshipRepository friendshipRepo;
	
	// constructor dependency injection 
	public UserService(
			UserRepository userRepo,
			SessionRepository sessionRepo,
			LibraryRepository libraryRepo,
			ReviewRepository reviewRepo,
			FriendshipRepository friendshipRepo) {
		
		this.userRepo = userRepo;
		this.sessionRepo = sessionRepo;
		this.libraryRepo = libraryRepo;
		this.reviewRepo = reviewRepo;
		this.friendshipRepo = friendshipRepo;
		
		// resets all sessions when the server is started
		sessionRepo.deleteAll();
	}
	
	// method to perform login
	public Map<String, String> login(UserDto userDto) {
		
		// checks if a record exists with the username and password from the DTO
		User user = userRepo.
				findByUsernameAndPassword(
						userDto.getUsername(), 
						userDto.getPassword()).orElseThrow(
								()-> new LoginException(
										"Username or password wrong"));
		
		// token generation
		String token = UUID.randomUUID().toString();
		
		// creates a new valid session and saves it to the database
		Session session = new Session(user.getId(), token);
		sessionRepo.save(session);
		
		
		Map<String, String> response = new HashMap<String, String>();
		response.put("token", token);
		response.put("type", user.getType());
		response.put("username", user.getUsername());
		
		return response;
	}
	
	
	// logout method
	public String logout(String token) {
		
		// checks if a valid session exists with the given tokem
		Session session = sessionRepo.findByToken(token).orElseThrow(
				() -> new SessionNotFoundException());
		
		// deletes the record if exists
		sessionRepo.delete(session);
		
		return "LOGOUT_SUCCESS";
	}
	
	
	// profile method to access the private area
	public String profile(String token) {
		
		// check if the session exists with the given token
		Session session = sessionRepo.findByToken(token).orElseThrow(
				()-> new SessionNotFoundException());
			
		// checks if the user associated with the session exists
		User user = userRepo.findById(session.getUserId()).
				orElseThrow(() -> new InvalidUserException());

		// personalized message for each user
		return "ACCESS GRANTED FOR USER " + user.getUsername();
	}
	
	
	public User register(User user) {
		
		// A string builder for building the final message error
		StringBuilder errors = new StringBuilder();
		
		// checks if the username and email fields already exist in the table
		// if present, it adds them on the string builder
		if (userRepo.findByUsername(user.getUsername()).isPresent())
			errors.append("Username taken. ");
		
		if (userRepo.findByEmail(user.getEmail()).isPresent())
			errors.append("Email taken. ");
			
		// if the string builder is not empty it throws an exception 
		if(!errors.isEmpty())
			throw new DuplicateParamException(errors.toString());

		// set the local date for the created account
		user.setCreation_timestamp(LocalDate.now());
		
		// set the new user as a "user" type
		user.setType("user");
		
		// save the new user on the table
		userRepo.save(user);
		
		return user;
	}

	
	/* Alessio
	 * I need to fetch the token for (Post) review 
	 * */
	public User getUserByToken(String token) {
		
	    Session session = sessionRepo.findByToken(token).orElse(null);

	    if (session == null) {
	        return null;
	    }

	    return userRepo.findById(session.getUserId()).orElse(null);
	}
	


	
	public Map<String, Object> getUserStats(String token){
		// check if the session exists with the given token
		Session session = sessionRepo.findByToken(token).orElseThrow(
						()-> new SessionNotFoundException());
					
		// checks if the user associated with the session exists
		User user = userRepo.findById(session.getUserId()).orElseThrow(
				() -> new InvalidUserException());
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		
		map.put("username", user.getUsername());
		map.put("email", user.getEmail());
		map.put("read", getReadedMangaCount(user));
		map.put("friends", getFriendsCount(user));		
		map.put("reviews", getReviewCount(user));
		map.put("id", user.getId());
		
				
		
		return map;
		
	}
	
	
	public Map<String, Object> getFriendStats(long id){
		
		User user = userRepo.findById(id).orElseThrow(
				() -> new InvalidUserException("Friend not found"));
		
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		
		map.put("username", user.getUsername());
		map.put("email", user.getEmail());
		map.put("read", getReadedMangaCount(user));
		map.put("friends", getFriendsCount(user));		
		map.put("reviews", getReviewCount(user));
		map.put("id", user.getId());
		
		
		return map;
	}
	
	
	public Map<String, Object> getUserStatsByUsername(String username) {
	    // Cerca l’utente con lo username
	    User user = userRepo.findByUsername(username)
	            .orElseThrow(() -> new InvalidUserException("User not found"));

	    Map<String, Object> map = new LinkedHashMap<>();

	    map.put("username", user.getUsername());
	    map.put("email", user.getEmail());
	    map.put("read", getReadedMangaCount(user));
	    map.put("friends", getFriendsCount(user));
	    map.put("reviews", getReviewCount(user));

	    return map;
	}

	@Transactional
	public User updateUser(String token, User updatedUser) {
		Session session = sessionRepo.findByToken(token).orElseThrow(
				()-> new SessionNotFoundException());
			
		// checks if the user associated with the session exists
		User user = userRepo.findById(session.getUserId()).orElseThrow(
				() -> new InvalidUserException());
		
		StringBuilder errors = new StringBuilder();
		
		if(!updatedUser.getUsername().equals(user.getUsername())) {
			if (userRepo.findByUsername(updatedUser.getUsername()).isPresent())
				errors.append("Username taken. ");
		}
		
		if(!updatedUser.getEmail().equals(user.getEmail())) {
			if (userRepo.findByEmail(updatedUser.getEmail()).isPresent())
				errors.append("Email taken. ");
		}
		
		if(errors.length()!=0) {
			throw new DuplicateParamException(errors.toString());
		}
		
		user.setUsername(updatedUser.getUsername());
		user.setEmail(updatedUser.getEmail());
		user.setPassword(updatedUser.getPassword());
		
		userRepo.save(user);
		
		return user;
		
	}
	
	
	public List<User> getUsers(){
		return userRepo.findByType("user");
	}
	
	
	public int getReadedMangaCount(User user) {
		List<Library> list = libraryRepo.findByUser_IdAndStatus(user.getId(), "completato");
		return list.size();
	}
	
	private int getReviewCount(User user) {
		List<Review> list = reviewRepo.findByUser(user);
		return list.size();
	}
	
	private int getFriendsCount(User user) {
		List<Friendship> list = friendshipRepo.findByUserAndStatus(user, "accettata");
		return list.size();
	}
	
	
}
