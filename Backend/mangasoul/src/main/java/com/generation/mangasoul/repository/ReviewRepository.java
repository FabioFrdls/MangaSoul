package com.generation.mangasoul.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	  List<Review> findByManga_Id(long mangaId);
}