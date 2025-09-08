package com.generation.mangasoul.utility;

public class MangaDto {

	private String title;
	private int year;
	private int volumes;
	double score;
	String status;
	
	
	public MangaDto(String title, int year, int volumes, double score, String status) {
		super();
		this.title = title;
		this.year = year;
		this.volumes = volumes;
		this.score = score;
		this.status = status;
	}

	public MangaDto() {}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getVolumes() {
		return volumes;
	}

	public void setVolumes(int volumes) {
		this.volumes = volumes;
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
	
	

}
