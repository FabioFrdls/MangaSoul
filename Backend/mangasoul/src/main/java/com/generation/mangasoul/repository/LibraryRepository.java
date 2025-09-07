package com.generation.mangasoul.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Library;
import com.generation.mangasoul.model.Manga;


@Repository
public interface LibraryRepository extends JpaRepository<Library, Long>{
	public Library findByUser_IdAndManga_Id(long userId, long mangaId);
	public List<Library> findByUser_Id(long userId);
	public List<Library> findByUser_IdAndStatus(long userId, String status);
	public List<Library> findByUser_IdAndFav(long userId, String fav);
	@Query("SELECT l.manga FROM Library l " + "WHERE l.user.id = :userId " + "AND LOWER(l.manga.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	public List<Manga> findByUserAndTitleContaining(@Param("userId") Long userId, @Param("keyword") String keyword);
}
