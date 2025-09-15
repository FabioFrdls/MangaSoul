package com.generation.mangasoul.utility;

import com.generation.mangasoul.model.Library;

public class LibraryDto {
	
	private UserDto user;
	private MangaDto manga;
	private String status;
	private String fav;
	
	public LibraryDto(Library library) {
		super();
		this.user = new UserDto(library.getUser().getUsername(), library.getUser().getPassword());
		this.manga = new MangaDto(library.getManga());
		this.status = library.getStatus();
		this.fav = library.getFav();
	}
	
	public LibraryDto() {}

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public MangaDto getManga() {
		return manga;
	}

	public void setManga(MangaDto manga) {
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
