package com.generation.mangasoul.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
public class Manga {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "title cannot be blank")
	private String title;
	
	@NotBlank(message = "summary cannot be blank")
	private String summary;

	@Min(value = 1947, message = "doesn't exixts a manga written before 1947")
	private int year;
	
	@NotBlank(message = "image cannot be blank")
	private String image;
	
	@Positive()
	private int volumes;
	
	@NotBlank(message = "editor name cannot be blank")
	private String editor_name;
	
	private double score;
	
	@Pattern(regexp = "^(?i)(on going|complete|dropped)$")
	private String status;
	
	@ManyToOne()
	@JoinColumn(name = "author_id")
	private Author author;
	
	@ManyToMany()
	@JoinTable(
			name = "manga_genre", 
			joinColumns = @JoinColumn(name = "manga_id"),
			inverseJoinColumns = @JoinColumn(name = "genre_id")
	)
	private List<Genre> genres;
	
	@ManyToMany()
	@JoinTable(
			name = "library", 
			joinColumns = @JoinColumn(name = "manga_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> users;
	
	@OneToMany(mappedBy = "manga",
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Review> reviews;
		
	public Manga(
			long id, 
			String title, 
			String summary, 
			int year, 
			String image, 
			int volumes, 
			String editor_name,
			double score, 
			String status, 
			Author author, 
			List<Genre> genres, 
			List<User> users, 
			List<Review> reviews) {
		
		this.id = id;
		this.title = title;
		this.summary = summary;
		this.year = year;
		this.image = image;
		this.volumes = volumes;
		this.editor_name = editor_name;
		this.score = score;
		this.status = status;
		this.author = author;
		this.genres = genres;
		this.users = users;
		this.reviews = reviews;
	}
	
	public Manga() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getVolumes() {
		return volumes;
	}

	public void setVolumes(int volumes) {
		this.volumes = volumes;
	}

	public String getEditor_name() {
		return editor_name;
	}

	public void setEditor_name(String editor_name) {
		this.editor_name = editor_name;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReview(List<Review> reviews) {
		this.reviews = reviews;
	}
	
	
	
	
	
	
}

