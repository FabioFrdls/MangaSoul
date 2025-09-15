package com.generation.mangasoul.utility;

import java.util.List;

import com.generation.mangasoul.model.Author;
import com.generation.mangasoul.model.Genre;
import com.generation.mangasoul.model.Manga;

public class MangaDto {
	private long id;
	private String image;
	private String title;
	private String summary;
	private List<Genre> genres;
	private int year;
	private Author author;
	private String editor;
	private int volumes;
	private String status;
	private double score;
	
	public MangaDto(Manga manga) {
		super();
		this.id = manga.getId();
		this.image = manga.getImage();
		this.title = manga.getTitle();
		this.summary = manga.getSummary();
		this.genres = manga.getGenres();
		this.year = manga.getYear();
		this.author = manga.getAuthor();
		this.editor = manga.getEditor_name();
		this.volumes = manga.getVolumes();
		this.status = manga.getStatus();
		this.score = manga.getScore();
	}
	
	public MangaDto() {}

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public List<Genre> getGenre() {
		return genres;
	}

	public void setGenre(List<Genre> genres) {
		this.genres = genres;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public int getVolumes() {
		return volumes;
	}

	public void setVolumes(int volumes) {
		this.volumes = volumes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}
	
	
	
}