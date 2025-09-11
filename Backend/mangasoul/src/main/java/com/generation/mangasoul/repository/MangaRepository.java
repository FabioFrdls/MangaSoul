package com.generation.mangasoul.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Manga;

@Repository
public interface MangaRepository extends JpaRepository<Manga, Long> {
	List<Manga> findByTitleContainingIgnoreCase(String keyword); // for searching by a portion of text

	List<Manga> findByAuthor_FullNameContainingIgnoreCase(String keyword);
}