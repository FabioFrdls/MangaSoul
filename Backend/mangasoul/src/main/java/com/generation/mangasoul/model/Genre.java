package com.generation.mangasoul.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Genre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "name cannot be blank")
	private String name;
	
	public Genre(long id, @NotBlank(message = "name cannot be blank") String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Genre(@NotBlank(message = "name cannot be blank") String name) {
		super();
		this.name = name;
	}
	
	public Genre() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
