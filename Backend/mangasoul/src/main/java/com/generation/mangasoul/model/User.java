package com.generation.mangasoul.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@NotBlank(message = "username cannot be blank")
    private String username;
	@NotBlank(message = "email cannot be blank")
	private String email;
	@NotBlank(message = "password cannot be blank")
    private String password;
	private LocalDate creation_timestamp;
    @Pattern(regexp = "admin|utente", message = "Il ruolo deve essere 'admin' o 'utente'")
    private String type;
   @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<Review> reviewList=new ArrayList<>();
   @ManyToMany


}
