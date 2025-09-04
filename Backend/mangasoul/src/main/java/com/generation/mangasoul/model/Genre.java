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
	private String nome;
	
	public Genre(long id, @NotBlank(message = "name cannot be blank") String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	public Genre(@NotBlank(message = "name cannot be blank") String nome) {
		super();
		this.nome = nome;
	}
	
	public Genre() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
	
}
