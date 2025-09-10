package com.generation.mangasoul.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.InvalidUserException;
import com.generation.mangasoul.exception.MangaNotFoundException;
import com.generation.mangasoul.exception.SessionNotFoundException;
import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.Session;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.MangaRepository;
import com.generation.mangasoul.repository.ReviewRepository;
import com.generation.mangasoul.repository.SessionRepository;
import com.generation.mangasoul.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminService {

	private UserRepository userRepo;
	private MangaRepository mangaRepo;
	private ReviewRepository reviewRepo;
	private SessionRepository sessionRepo;

	public AdminService(UserRepository userRepo, MangaRepository mangaRepo, ReviewRepository reviewRepo,
			SessionRepository sessionRepo) {

		this.userRepo = userRepo;
		this.mangaRepo = mangaRepo;
		this.reviewRepo = reviewRepo;
		this.sessionRepo = sessionRepo;
	}

	/* CRUD methods for the admin ----------------- */

	// verifica se il token è di un admin, altrimenti lancia eccezione
	private void verifyAdmin(String token) {

		Session session = sessionRepo.findByToken(token).orElseThrow(() -> new SessionNotFoundException());

		User user = userRepo.findById(session.getUserId()).orElseThrow(() -> new InvalidUserException());

		if (user.getType() == null || !user.getType().equalsIgnoreCase("admin"))
			throw new InvalidUserException();
	}

	// return a list of all the users
	public List<User> getAllUsers(String token) {
		verifyAdmin(token);
		return userRepo.findAll();
	}

	// update the user
	public String updateUser(long id, User updatedUser, String token) {
		verifyAdmin(token);

		User user = userRepo.findById(id).orElseThrow(() -> new InvalidUserException());

		user.setUsername(updatedUser.getUsername());
		user.setEmail(updatedUser.getEmail());
		user.setPassword(updatedUser.getPassword());
		user.setType(updatedUser.getType());

		userRepo.save(user);

		return "USER UPDATED";
	}

	// delete the user given the id
	public String deleteUser(long id, String token) {
		verifyAdmin(token);

		User user = userRepo.findById(id).orElseThrow(() -> new InvalidUserException());
		userRepo.delete(user);
		return "USER DELETED";
	}

	
	/*
	 * I need this method to view all the review of a single user
	 * It returns a list of map (because I am too lazy to use a dto)
	 * All the review are sorted by time stamp
	 * 
	 * */
	public List<Map<String, Object>> getReviewsById(String token, long id) {
	    verifyAdmin(token);

	    User user = userRepo.findById(id)
	            .orElseThrow(() -> 
	            new InvalidUserException("The user doesn't exist"));

	    List<Review> reviewList = reviewRepo.findByUser(user);

	    reviewList.sort(
	    		(r1, r2) -> 
	    			r1.getCreationTimestamp().compareTo(r2.getCreationTimestamp()));

	    List<Map<String, Object>> responseList = new ArrayList<>();

	    
	    reviewList.forEach(review -> {
	        Map<String, Object> reviewMap = new LinkedHashMap<>();
	        reviewMap.put("id", review.getId());
	        reviewMap.put("title", review.getManga().getTitle());
	        reviewMap.put("score", review.getScore());
	        reviewMap.put("text", review.getText());
	        reviewMap.put("timestamp", review.getCreationTimestamp());
	        responseList.add(reviewMap);
	    });

	    return responseList;
	}
	
	
	/*
	 * Here I defined some crud methods for Creating,
	 * Updating and deleting manga having  the admin
	 * permission
	 * 
	 * */	
	
	@Transactional
	public String createManga(String token, Manga manga) {
		verifyAdmin(token);
		mangaRepo.save(manga);
		
		return "MANGA ADDED";
	}
	
	@Transactional
	public String updateManga(String token, long id, Manga updatedManga) {
		verifyAdmin(token);
		
		Manga manga = mangaRepo.findById(id).orElseThrow(
				()-> new MangaNotFoundException());
		
		manga.setTitle(updatedManga.getTitle());
		manga.setSummary(updatedManga.getSummary());
		manga.setScore(updatedManga.getScore());
	    manga.setImage(updatedManga.getImage());
	    
	    manga.getGenres().clear();
	    manga.getGenres().addAll(updatedManga.getGenres());
	    
	    
	    return "MANGA UPDATED";
	}
	
	public String deleteManga(String token, long id) {
		verifyAdmin(token);
		
		Manga manga = mangaRepo.findById(id).orElseThrow(
				()-> new MangaNotFoundException());
		
		mangaRepo.delete(manga);
		
		return "MANGA DELETED";
	}


}
