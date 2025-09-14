package com.generation.mangasoul.utility;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewDto {
  	
	private long id;

  	private String username;
  	
  	private double score;
  	
  	private String text;
  	
  	private LocalDateTime creationTimestamp;

  	public ReviewDto(long id, String username, double score, String text, LocalDateTime creationTimestamp) {
  		this.id = id;
  		this.username = username;
  		this.score = score;
  		this.text = text;
  		this.creationTimestamp = creationTimestamp;
  	}
  	
  	public ReviewDto(String text, double score) {
  		this.text = text;
  		this.score = score;
  	}
  	
  	public ReviewDto() {}
  	
  	public double getScore() {
  		return score;
  	}

  	public void setScore(double score) {
  		this.score = score;
  	}

  	public String getText() {
  		return text;
  	}

  	public void setText(String text) {
  		this.text = text;
  	}

  	public String getUsername() {
  		return username;
  	}

  	public void setUsername(String username) {
  		this.username = username;
  	}

  	public LocalDateTime getCreationTimestamp() {
  		return creationTimestamp;
  	}

  	public void setCreationTimestamp(LocalDateTime creationTimestamp) {
  		this.creationTimestamp = creationTimestamp;
  	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

  }