package com.generation.mangasoul.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.mangasoul.model.Friendship;
import com.generation.mangasoul.model.User;


@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long>{
	
	List<Friendship> findByUserAndStatus(User user, String status);
	Optional<Friendship> findByUserAndFriend(User user, User friend);
	List<Friendship> findByFriendAndStatus(User friend, String status);

}
