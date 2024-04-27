package com.example.pubfinder.model;

import com.example.pubfinder.model.enume.GenderType;
import com.example.pubfinder.model.enume.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
@Entity
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long idUser;
    //test
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String phoneNumber;
    private boolean validated;
    private Date birthDate;
    private String nationality;
    private Instant creationDate;
    private String profilePicture;
    private Long tokenToValidate;
    private Long tokenToForgotPassword;
    private LocalDateTime tokenToForgotPasswordCreationDate;
    private LocalDateTime validateCodeCreationDate;
    private boolean activeUser;
    @Enumerated(EnumType.STRING)
    private RoleType roleTypes;
    @Enumerated(EnumType.STRING)
    private GenderType genderType;
    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Publication> publications;
}
