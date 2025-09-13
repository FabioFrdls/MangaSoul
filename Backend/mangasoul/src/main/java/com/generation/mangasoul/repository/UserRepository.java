package com.generation.mangasoul.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	public Optional<User> findByUsernameAndPassword(String username, String password);
	public Optional<User> findByUsername(String username);
	public Optional<User> findByEmail(String email);
	public List<User> findByType(String type);

}
