package com.generation.mangasoul.service;
  import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.ReviewNotFoundException;
import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.ReviewRepository;
import com.generation.mangasoul.utility.ReviewDto;

import jakarta.persistence.EntityNotFoundException;

  @Service
  public class ReviewService {

  	private ReviewRepository reviewRepo;

  	public ReviewService(ReviewRepository reviewRepo) {
  		this.reviewRepo = reviewRepo;
  	}

  	public void postReview(Review review) {
  		review.setCreationTimestamp(LocalDateTime.now());
  		reviewRepo.save(review);
  	}
  	

  	// this method is needed for verification, user is only allowed to post 1 comment
  	public boolean reviewExists(User user, Manga manga) {
  		
  	    return reviewRepo.existsByUserAndManga(user, manga);
  	}
  	
  	public List<ReviewDto> sortedReviewsByMangaIdDesc(Long mangaId) {

  		return reviewRepo.sortedReviewsByMangaIdDesc(mangaId);
  	}

  	public List<ReviewDto> sortedReviewsByMangaIdAsc(Long mangaId) {

  		return reviewRepo.sortedReviewsByMangaIdAsc(mangaId);
  	}

  	// ---- seems like JPA fetches everything, like literally everything ( too much
  	// data )
  	// Desc
  	public List<Review> getReviewsByMangaIdDesc(long mangaId) {

  		return reviewRepo.findByManga_IdOrderByCreationTimestampDesc(mangaId);
  	}

  	// Asc
  	public List<Review> getReviewsByMangaIdAsc(long mangaId) {

  		return reviewRepo.findByManga_IdOrderByCreationTimestampAsc(mangaId);
  	}
  	// ----

  	public List<Review> getReviewsByMangaId(long mangaId) {

  		return reviewRepo.findByManga_Id(mangaId);
  	}

  	public List<Review> getAll() {
  		return reviewRepo.findAll();
  	}

  	public Review getById(Long id) {
  		return reviewRepo.findById(id)
  				.orElseThrow(() -> new EntityNotFoundException("Review with id: " + id + " not found"));
  	}

  	public void updateReviewById(Review r) {

  		Long id = r.getId();

  		if (reviewRepo.existsById(id)) {
  			reviewRepo.save(r);
  		} else {
  			throw new EntityNotFoundException("Review with id: " + id + " not found");
  		}
  	}

  	public void deleteReviewById(long id) {

  		List<Review> reviewList = getAll();

  		// I'm using .stream because it's not possible to list.get(index) with a long
  		boolean exist = reviewList.stream().anyMatch(review -> review.getId() == id);

  		if (exist) {
  			reviewRepo.deleteById(id);
  		} else {
  			throw new ReviewNotFoundException();
  		}
  	}
  	
  	
  	public List<Review> getByUser(User user){
  		return reviewRepo.findByUser(user);
  	}

  }
