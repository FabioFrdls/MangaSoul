package com.generation.mangasoul.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.Review;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.utility.ReviewDto;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByManga_Id(long mangaId);

	List<Review> findByUser(User user);

	// database does the sorting, no need to sort manually or (Sort sort)
	List<Review> findByManga_IdOrderByCreationTimestampDesc(long mangaId);

	List<Review> findByManga_IdOrderByCreationTimestampAsc(long mangaId);

	@Query("""
		    SELECT new com.generation.mangasoul.utility.ReviewDto(
		        r.id,
		        r.user.username,
		        r.score,
		        r.text,
		        r.creationTimestamp
		    )
		    FROM Review r
		    WHERE r.manga.id = :mangaId
		    ORDER BY r.creationTimestamp DESC
		""")
	List<ReviewDto> sortedReviewsByMangaIdDesc(@Param("mangaId") Long mangaId);

	@Query("""
		    SELECT new com.generation.mangasoul.utility.ReviewDto(
		        r.id,
		        r.user.username,
		        r.score,
		        r.text,
		        r.creationTimestamp
		    )
		    FROM Review r
		    WHERE r.manga.id = :mangaId
		    ORDER BY r.creationTimestamp ASC
		""")
	List<ReviewDto> sortedReviewsByMangaIdAsc(@Param("mangaId") Long mangaId);

	boolean existsByUserAndManga(User user, Manga manga);

}
