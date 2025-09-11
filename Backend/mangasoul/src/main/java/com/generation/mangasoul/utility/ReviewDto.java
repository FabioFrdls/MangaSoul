package com.generation.mangasoul.utility;

import java.time.LocalDateTime;

public class ReviewDto {
  	

  	private String username;
  	private double score;
  	private String text;
  	private LocalDateTime creationTimestamp;

  	public ReviewDto(String username, double score, String text, LocalDateTime creationTimestamp) {
  		this.username = username;
  		this.score = score;
  		this.text = text;
  		this.creationTimestamp = creationTimestamp;
  	}

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

  }