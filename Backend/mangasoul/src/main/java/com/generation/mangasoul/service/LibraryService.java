package com.generation.mangasoul.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.generation.mangasoul.model.Library;
import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.model.Session;
import com.generation.mangasoul.model.User;
import com.generation.mangasoul.repository.LibraryRepository;
import com.generation.mangasoul.repository.SessionRepository;
import com.generation.mangasoul.repository.UserRepository;
import com.generation.mangasoul.utility.LibraryDto;
import com.generation.mangasoul.utility.MangaDto;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LibraryService {
	
	private LibraryRepository libraryRepository;
	private UserRepository userRepository;
	private SessionRepository sessionRepository;
	
	
	
	public LibraryService(LibraryRepository libraryRepository, UserRepository userRepository, SessionRepository sessionRepository) {
		super();
		this.libraryRepository = libraryRepository;
		this.userRepository = userRepository;
		this.sessionRepository = sessionRepository;
	}

	// auxiliary methods
	
	public Long getUserIdFromToken(String token) {			// takes the actual userId from the client
	    Session session = sessionRepository.findByToken(token)
	        .orElseThrow(() -> new RuntimeException("Token non valido"));
	    return session.getUserId();
	}
	
	
	
	
	public List<MangaDto> libToMDto(List<Library> lib){
		return lib.stream() 								// transforms the Library list into an object Library stream
                .map(Library::getManga)					// maps each Library of the stream to a Manga object
                .map(m -> new MangaDto(m))					// maps each manga in a MandaDto
                .toList();								// transforms the MangaDto stream in a MangaDto list
	}
	/*
	
	
	public List<MangaDto> mangaToDto(List<Manga> manga){
		return manga.stream() 							
				.map(m -> new MangaDto(m))
                .toList();								
	}
	*/
	
	public List<LibraryDto> libToDto(List<Library> lib){
		return lib.stream().map(LibraryDto::new).toList();
	}
	
	// http methods
	
	public void insert(long userId, Manga manga) {
		User user = userRepository.findById(userId).get();
		Library lib = new Library(user, manga, "", "no");
		libraryRepository.save(lib);
	}
	
	public List<LibraryDto> findLib(long userId){
		return libToDto(libraryRepository.findByUser_Id(userId));
	}
	
	public Library findById(long userId, long mangaId) {
		return libraryRepository.findByUser_IdAndManga_Id(userId, mangaId);
	}
	
	
	public List<MangaDto> findAllM(long userId){
		return libToMDto(libraryRepository.findByUser_Id(userId));
				
	}
	
	
	public List<LibraryDto> findByKeyWord(long userId, String keyWord){
		return libToDto(libraryRepository.findByUserAndTitleContaining(userId, keyWord));
	}
	
	public List<LibraryDto> findByStatus(long userId, String status) {
	    return libToDto(libraryRepository.findByUser_IdAndStatus(userId, status));
	}

	public List<LibraryDto> findByFav(long userId, String fav) {
	    return libToDto(libraryRepository.findByUser_IdAndFav(userId, fav));
	}
	
	public List<LibraryDto> findByStatAndFav(long userId, String status, String fav) {
	    return libToDto(libraryRepository.findByUser_IdAndStatusAndFav(userId, status, fav));
	}
	
	
	public void update(long userId, long mangaId, String status, String fav) {			// updates both status and fav
		Library lib = libraryRepository.findByUser_IdAndManga_Id(userId, mangaId);
		if(lib.getStatus().equals(status) && lib.getFav().equals(fav))
			return;
		if(!lib.getStatus().equals(status))
			lib.setStatus(status);
		if(!lib.getFav().equals(fav))
			lib.setFav(fav);
		libraryRepository.save(lib);
	}
	
	public void delete(long userId, long mangaId) {
		libraryRepository.deleteByUser_IdAndManga_Id(userId, mangaId);
	}
	
}
