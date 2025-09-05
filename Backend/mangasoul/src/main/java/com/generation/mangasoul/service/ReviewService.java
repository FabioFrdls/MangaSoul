package com.generation.mangasoul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.ReviewNotFoundException;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.repository.ReviewRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepo;

	public void postReview(Review review) {
		reviewRepo.save(review);
	}

	public List<Review> getAll() {
		return reviewRepo.findAll();
	}

	public Review getById(Long id) {
		return reviewRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Review not found, id : " + id));
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
		
		if(exist) {
		reviewRepo.deleteById(id);
		} else {
			throw new ReviewNotFoundException();
		}
	}

}
