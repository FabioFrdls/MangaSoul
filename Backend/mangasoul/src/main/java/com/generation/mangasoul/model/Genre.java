package com.generation.mangasoul.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Genre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "name cannot be blank")
	private String name;
	
	@ManyToMany(mappedBy = "genres")
	@JsonIgnore  // per evitare ciclo infinito
	private List<Manga> mangas;
	
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
