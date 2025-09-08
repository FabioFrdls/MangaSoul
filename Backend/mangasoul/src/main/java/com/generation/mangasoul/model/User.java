package com.generation.mangasoul.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message = "username cannot be blank")
	private String username;

	@NotBlank(message = "email cannot be blank")
	private String email;

	@NotBlank(message = "password cannot be blank")
	private String password;

	private LocalDate creation_timestamp;

	@Pattern(regexp = "admin|user")
	private String type;

	// Some recursive sht is happening, we either use JsonIgnore or something else
	// Pick whatever you think suits best this scenario
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore 
	private List<Review> reviewList = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Library> libraryList = new ArrayList<>();

	public User(
			long id, 
			String username, 
			String email,
			String password, 
			LocalDate creation_timestamp, 
			String type,
			List<Review> reviewList, 
			List<Library> libraryList) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.creation_timestamp = creation_timestamp;
		this.type = type;
		this.reviewList = reviewList;
		this.libraryList = libraryList;
	}
	
	public User() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDate getCreation_timestamp() {
		return creation_timestamp;
	}

	public void setCreation_timestamp(LocalDate creation_timestamp) {
		this.creation_timestamp = creation_timestamp;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Review> getReviewList() {
		return reviewList;
	}

	public void setReviewList(List<Review> reviewList) {
		this.reviewList = reviewList;
	}

	public List<Library> getLibraryList() {
		return libraryList;
	}

	public void setLibraryList(List<Library> libraryList) {
		this.libraryList = libraryList;
	}
	
	

}
