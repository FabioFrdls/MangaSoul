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

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.service.ReviewService;
import com.generation.mangasoul.service.UserService;
import com.generation.mangasoul.utility.ReviewDto;

import jakarta.validation.Valid;

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
	public ResponseEntity<String> insertReview(@RequestHeader(name = "access-token") String token,
			@RequestBody @Valid Review r) {

		User u = userService.getUserByToken(token);

		if (u == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token non valido.");
		}

		r.setUser(u);

		Manga manga = r.getManga();

		if (reviewService.reviewExists(u, manga)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Hai già lasciato una recensione per questo manga.");
		}

		reviewService.postReview(r);
		return ResponseEntity.ok("Recensione pubblicata con successo.");
	}

	@GetMapping("/sortedReviewsByMangaIdDesc")
	public ResponseEntity<List<ReviewDto>> sortedReviewsByMangaIdDesc(@RequestParam(name = "manga_id") long id) {

		List<ReviewDto> reviewDtoListDesc = reviewService.sortedReviewsByMangaIdDesc(id);

		return ResponseEntity.ok(reviewDtoListDesc);
	}

	@GetMapping("/sortedReviewsByMangaIdAsc")
	public ResponseEntity<List<ReviewDto>> sortedReviewsByMangaIdAsc(@RequestParam(name = "manga_id") long id) {

		List<ReviewDto> reviewDtoListAsc = reviewService.sortedReviewsByMangaIdAsc(id);

		return ResponseEntity.ok(reviewDtoListAsc);
	}

	// notes in service, I'll keep it here in case admin needs it
	// --------------------------------------------------------------------------------------------------------
	@GetMapping("/getReviewsByMangaIdAsc")
	public ResponseEntity<List<Review>> getReviewsByMangaIdAsc(@RequestParam(name = "manga_id") long id) {

		List<Review> reviewListAsc = reviewService.getReviewsByMangaIdAsc(id);

		return ResponseEntity.ok(reviewListAsc);

	}

	@GetMapping("/getReviewsByMangaIdDesc")
	public ResponseEntity<List<Review>> getReviewsByMangaIdDesc(@RequestParam(name = "manga_id") long id) {

		List<Review> reviewListDesc = reviewService.getReviewsByMangaIdDesc(id);

		return ResponseEntity.ok(reviewListDesc);
	}

	// --------------------------------------------------------------------------------------------------------

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

	// mostly for admin, also somewhat redundant, getting all reviews from a
	// specific user would be more fitting
	@GetMapping("/getById/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable long id) {

		if (reviewService.getById(id) != null) {
			return ResponseEntity.ok(reviewService.getById(id));
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	// should allow the user to change their comment, should timestamp be updated
	// aswell?
	// or we just flag the comment with " edited "
	@PutMapping("/updateById/{id}")
	public ResponseEntity<Review> updateById(@PathVariable long id, @RequestBody @Valid Review r) {

		r.setId(id);
		reviewService.updateReviewById(r);
		return ResponseEntity.ok(r);

	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<String> deleteById(@PathVariable long id) {

		reviewService.deleteReviewById(id);
		return ResponseEntity.ok("Review successfully deleted");

	}

	/*
	 * I need this for the user in his private area
	 * 
	 * Pio
	 * 
	 */

	@GetMapping("/getByToken")
	public ResponseEntity<List<Review>> getByToken(@RequestHeader(name = "access-token") String token){
		User user = userService.getUserByToken(token);
		List<Review> reviews = reviewService.getByUser(user);
		
		if(user == null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.ok(reviews);
	}

}