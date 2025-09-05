package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.service.ReviewService;

@Controller
@RequestMapping("api/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	@PostMapping("/insert")
	public ResponseEntity<String> insertReview(@RequestBody Review r) {
		
		reviewService.postReview(r);
		
		return ResponseEntity.ok("Review posted successfully");
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<Review>> getAllReviews(){
		
		List<Review> reviewList = reviewService.getAll();
		
		// I'm using isEmpty() because the list can never be null
		if(reviewList.isEmpty()) {
			
			// *List exist, but could be empty so noContent is better than notFound
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(reviewList);
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable long id){
		
		if(reviewService.getById(id) != null)
		{
			return ResponseEntity.ok(reviewService.getById(id));
		} else {
			return ResponseEntity.notFound().build();
		}
			
	}
	
	@PutMapping("/updateById/{id}")
	public ResponseEntity<Review> updateById(@PathVariable long id, @RequestBody Review r){
		
		r.setId(id);
		reviewService.updateReviewById(r);
		return ResponseEntity.ok(r);
		
	}
	
	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id){
		
		reviewService.deleteReviewById(id);
		return ResponseEntity.ok("Review successfully deleted");
		
	}
	
}
