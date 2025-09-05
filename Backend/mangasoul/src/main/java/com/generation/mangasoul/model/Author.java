package com.generation.mangasoul.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
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
	@Column(name = "full_name")
	private String fullName;
	
	@NotNull(message = "L'autore deve avere una data di nascita")
	private LocalDate birthdate;

	@OneToMany(mappedBy = "author")
	@JsonIgnore
	private List<Manga> mangaList = new ArrayList<>();
	
	
	public Author(long id,  String full_name, LocalDate birthdate, List<Manga> mangaList) {
		super();
		this.id = id;
		this.fullName = full_name;
		this.birthdate = birthdate;
		this.mangaList = mangaList;
	}
	
	public Author() {}
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getFull_name() {
		return fullName;
	}


	public void setFull_name(String fullName) {
		this.fullName = fullName;
	}


	public LocalDate getBirthdate() {
		return birthdate;
	}


	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public List<Manga> getMangaList() {
		return mangaList;
	}

	public void setMangaList(List<Manga> mangaList) {
		this.mangaList = mangaList;
	} 
	
	
}
