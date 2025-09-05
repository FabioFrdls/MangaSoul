package com.generation.mangasoul.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
	
	List<Author> findByFullName(String name);
	
}
