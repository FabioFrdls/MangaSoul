package com.generation.mangasoul.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Library;
import com.generation.mangasoul.model.Manga;


@Repository
public interface LibraryRepository extends JpaRepository<Library, Long>{
	public List<Manga> findByStatus(String status);
	public List<Manga> findByFav(String fav);
}
