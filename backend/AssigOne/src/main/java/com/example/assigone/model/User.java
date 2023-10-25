package com.example.assigone.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "user_tbl")
public class User {
    @Id
    // adnotare pentru generarea id-urilor automat
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String password;
    private String cnp;
    @JsonManagedReference(value = "user-fine")
    @OneToMany
    private List<Fine> finesList;
    private boolean loggedIn;
 }
