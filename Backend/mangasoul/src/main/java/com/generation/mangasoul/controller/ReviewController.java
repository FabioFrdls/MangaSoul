package com.generation.mangasoul.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.service.ReviewService;
import com.generation.mangasoul.service.UserService;

@Controller
@RequestMapping("api/review")
@CrossOrigin(origins = "*")
public class ReviewController {

	private ReviewService reviewService;
	private UserService userService;

	public ReviewController(ReviewService reviewService, UserService userService) {
		this.reviewService = reviewService;
		this.userService = userService;
	}

	@PostMapping("/insert")
	public ResponseEntity<String> insertReview(
			@RequestHeader(name = "access-token") String token,
			@RequestBody Review r)
	{
		
		// we get the token through user
		User u = userService.getUserByToken(token);
		
		// check if it's null
		if(u == null)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("something about token is not right.");
		}
		
		// review ha un getter/setter di user
		r.setUser(u);
		
		reviewService.postReview(r);
		return ResponseEntity.ok("Review posted successfully");
	}

	// gets the review based on manga Id, otherwise all manga's review section
	// would print every single review, including the ones from other manga.
	@GetMapping("/getMangaById")
	public ResponseEntity<List<Review>> getMangaById(@RequestParam(name = "manga_id") long id) {
		
		List<Review> reviewList = reviewService.getReviewsByMangaId(id);
		
		return ResponseEntity.ok(reviewList); 
	}

	// somewhat redundant, has no practical use
	@GetMapping("/getAll")
	public ResponseEntity<List<Review>> getAllReviews() {

		List<Review> reviewList = reviewService.getAll();

		// I'm using isEmpty() because the list can never be null
		if (reviewList.isEmpty()) {

			// *List exist, but could be empty so noContent is better than notFound
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(reviewList);
	}

	// mostly for admin
	@GetMapping("/getById/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable long id) {

		if (reviewService.getById(id) != null) {
			return ResponseEntity.ok(reviewService.getById(id));
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	@PutMapping("/updateById/{id}")
	public ResponseEntity<Review> updateById(@PathVariable long id, @RequestBody Review r) {

		r.setId(id);
		reviewService.updateReviewById(r);
		return ResponseEntity.ok(r);

	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {

		reviewService.deleteReviewById(id);
		return ResponseEntity.ok("Review successfully deleted");

	}

}