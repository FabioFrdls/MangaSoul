package com.generation.mangasoul.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.DuplicateParamException;
import com.generation.mangasoul.exception.InvalidUserException;
import com.generation.mangasoul.exception.LoginException;
import com.generation.mangasoul.exception.SessionNotFoundException;
import com.generation.mangasoul.model.Session;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.SessionRepository;
import com.generation.mangasoul.repository.UserRepository;
import com.generation.mangasoul.utility.UserDto;

@Service
public class UserService {

	private UserRepository userRepo;
	private SessionRepository sessionRepo;
	
	// constructor dependency injection 
	public UserService(
			UserRepository userRepo,
			SessionRepository sessionRepo) {
		
		this.userRepo = userRepo;
		this.sessionRepo = sessionRepo;
		
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
	
	
	public String register(User user) {
		
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
		
		return "REGISTER SUCCESS";
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
	


	
	/* CRUD methods for the admin -----------------*/

	// verifica se il token è di un admin, altrimenti lancia eccezione
	private void verifyAdmin(String token) {
	    Session session = sessionRepo.findByToken(token)
	        .orElseThrow(() -> new SessionNotFoundException());
	    User user = userRepo.findById(session.getUserId())
	        .orElseThrow(() -> new InvalidUserException());
	    if(!"admin".equalsIgnoreCase(user.getType())) {
	        throw new InvalidUserException();
	    }
	}

	// return a list of all the users
	public List<User> getAllUsers(String token) {
	    verifyAdmin(token);
	    return userRepo.findAll();
	}

	// update the user
	public String updateUser(long id, User updatedUser, String token) {
	    verifyAdmin(token);
	    
	    User user = userRepo.findById(id)
	        .orElseThrow(() -> new InvalidUserException());
	    user.setUsername(updatedUser.getUsername());
	    user.setEmail(updatedUser.getEmail());
	    user.setType(updatedUser.getType());
	    userRepo.save(user);
	    return "USER UPDATED";
	}

	// delete the user given the id
	public String deleteUser(long id, String token) {
	    verifyAdmin(token);

	    User user = userRepo.findById(id)
	        .orElseThrow(() -> new InvalidUserException());
	    userRepo.delete(user);
	    return "USER DELETED";
	}

	
}
