package com.generation.mangasoul.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Author {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	
	@NotBlank(message = "L'autore deve avere nome e cognome ")
	private String full_name;
	
	@NotNull(message = "L'autore deve avere una data di nascita")
	private LocalDate birthdate;

	
	public Author(long id, String full_name, LocalDate birthdate){
		this.id = id;
		this.full_name = full_name;
		this.birthdate = birthdate;
	}
	
	public Author() {}
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getFull_name() {
		return full_name;
	}


	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}


	public LocalDate getBirthdate() {
		return birthdate;
	}


	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	} 
	
	
}
