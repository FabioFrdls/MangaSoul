package com.generation.mangasoul.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Pattern;

@Entity
public class Library {
	
	/*Definizione della classe library*/
	
	@Id
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)                 
    @JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manga_id", nullable = false)
    @JsonIgnore
    private Manga manga;
    
    @Pattern(regexp = "^(?i)(|da leggere|in lettura|completato|abbandonato)$")		// here we leave the value blank by default with the first "|"
    private String status;
    @Pattern(regexp = "^(?i)(si|no)$")
    private String fav;

    public Library() {}
    
	public Library(long id, User user, Manga manga, String status,
			String fav) {
		super();
		this.id = id;
		this.user = user;
		this.manga = manga;
		this.status = status;
		this.fav = fav;
	}
	
	public Library(User user, Manga manga, String status,
			String fav) {
		super();
		this.user = user;
		this.manga = manga;
		this.status = status;
		this.fav = fav;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Manga getManga() {
		return manga;
	}

	public void setManga(Manga manga) {
		this.manga = manga;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFav() {
		return fav;
	}

	public void setFav(String fav) {
		this.fav = fav;
	}
    
    
}
