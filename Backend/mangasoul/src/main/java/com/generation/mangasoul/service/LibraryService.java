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

	public Long getUserIdFromToken(String token) {			// takes the actual userId from the client
	    Session session = sessionRepository.findByToken(token)
	        .orElseThrow(() -> new RuntimeException("Token non valido"));
	    return session.getUserId();
	}
	
	public void insert(long userId, Manga manga, String status, String fav) {
		User user = userRepository.findById(userId).get();
		Library lib = new Library(user, manga, status, fav);
		libraryRepository.save(lib);
	}
	
	
	public List<MangaDto> findAll(long userId){
		return libraryRepository.findByUser_Id(userId)
				.stream() 								// transforms the Library list into an object Library stream
                .map(Library::getManga)					// maps each Library of the stream to a Manga object
                .map(m -> new MangaDto(					// maps each manga in a MandaDto
                        m.getTitle(),
                        m.getYear(),
                        m.getVolumes(),
                        m.getScore(),
                        m.getStatus()
                ))
                .toList();								// transforms the MangaDto stream in a MangaDto list
	}
	
	public List<MangaDto> findByKeyWord(long userId, String keyWord){
		return libraryRepository.findByUserAndTitleContaining(userId, keyWord).stream()
                .map(m -> new MangaDto(					
                        m.getTitle(),
                        m.getYear(),
                        m.getVolumes(),
                        m.getScore(),
                        m.getStatus()
                ))
                .toList();
	}
	
	public List<MangaDto> findByStatus(long userId, String status) {
	    return libraryRepository.findByUser_IdAndStatus(userId, status).stream()
                .map(Library::getManga)					
                .map(m -> new MangaDto(					
                        m.getTitle(),
                        m.getYear(),
                        m.getVolumes(),
                        m.getScore(),
                        m.getStatus()
                ))
                .toList();								
	}

	public List<MangaDto> findByFav(long userId, String fav) {
	    return libraryRepository.findByUser_IdAndStatus(userId, fav).stream()
                .map(Library::getManga)					
                .map(m -> new MangaDto(					
                        m.getTitle(),
                        m.getYear(),
                        m.getVolumes(),
                        m.getScore(),
                        m.getStatus()
                ))
                .toList();
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
	
}
