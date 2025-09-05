package com.generation.mangasoul.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
	
	public Optional<Session> findByToken(String token);
}
