package com.generation.mangasoul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.mangasoul.model.Manga;
import com.generation.mangasoul.repository.MangaRepository;

import jakarta.persistence.EntityNotFoundException;
@Service
public class MangaService {
	@Autowired
	MangaRepository mangaRep;
	public List<Manga> findManga() {
		return mangaRep.findAll();
	}
	public void findById(long id) {
		mangaRep.findById(id);
	}
	public List<Manga> findByKeyWord(String keyWord){
		return mangaRep.findByTitleContainingIgnoreCase(keyWord);
	}
	public void createManga(Manga manga) {
		if(!mangaRep.existsById(manga.getId())) { //verify if the manga didn't exist yet
			mangaRep.save(manga); //create and save the manga passed by the start
		}
		else {
	        throw new EntityNotFoundException("Manga con id " + manga.getId() + " non trovato"); //if not exist

		}
	}
	public void deleteById(long id) {
		if (mangaRep.existsById(id)) {   // verify if exist
			mangaRep.deleteById(id);    // delete
                                          
	    } else {
	        throw new EntityNotFoundException("Manga con id " + id + " non trovato"); //if not exist
	    }
	}
	public void updateById(long id, Manga manga) {
	    if (mangaRep.existsById(id)) {   // verify if exist
	        manga.setId(id);             // set up the id for sure
	        mangaRep.save(manga);        // update
	    } else {
	        throw new EntityNotFoundException("Manga con id " + id + " non trovato"); //if not exist
	    }
	}

}
