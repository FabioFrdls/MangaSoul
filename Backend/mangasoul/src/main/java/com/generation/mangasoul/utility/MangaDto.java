package com.generation.mangasoul.utility;

import java.util.List;

import com.generation.mangasoul.model.Author;
import com.generation.mangasoul.model.Genre;

public class MangaDto {
	private String image;
	private String title;
	private String summery;
	private List<Genre> genres;
	private int year;
	private Author author;
	private String editor;
	private int volumes;
	private String status;
	private double score;
	
	public MangaDto(String image, String title, String summery, List<Genre> genres, int year, Author author, String editor, int volumes,
			String status, double score) {
		super();
		this.image = image;
		this.title = title;
		this.summery = summery;
		this.genres = genres;
		this.year = year;
		this.author = author;
		this.editor = editor;
		this.volumes = volumes;
		this.status = status;
		this.score = score;
	}
	
	public MangaDto() {}

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

	public String getSummery() {
		return summery;
	}

	public void setSummery(String summery) {
		this.summery = summery;
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