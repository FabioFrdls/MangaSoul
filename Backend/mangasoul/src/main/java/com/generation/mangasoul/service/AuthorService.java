package com.generation.mangasoul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.mangasoul.exception.ReviewNotFoundException;
import com.generation.mangasoul.model.Author;

import com.generation.mangasoul.repository.AuthorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepo;
	
	
	// find by Full Name
	public List<Author> findByFullName(String name){
		return authorRepo.findByFullName(name);
	}
	
	
	public void postAuthor(Author a) {
		authorRepo.save(a);
	}
	
	public List<Author> getAll() {
		return authorRepo.findAll();
	}

	public Author getById(Long id) {
		return authorRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Author with id: " + id + " not found"));
	}

	public void updateAuthorById(Author a) {
		
		Long id = a.getId();
		
		if (authorRepo.existsById(id)) {
			authorRepo.save(a);
		} else {
			throw new EntityNotFoundException("Author with id: " + id + " not found");
		}
	}

	public void deleteAuthorById(long id) {

		List<Author> reviewList = getAll();
		
		// I'm using .stream because it's not possible to list.get(index) with a long
		boolean exist = reviewList.stream().anyMatch(review -> review.getId() == id);
		
		if(exist) {
		authorRepo.deleteById(id);
		} else {
			throw new ReviewNotFoundException();
		}
	}
	
}
