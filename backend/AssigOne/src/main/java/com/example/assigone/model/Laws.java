package com.example.assigone.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "laws_tbl")
public class Laws {
    @Id
    // adnotare pentru generarea id-urilor automat
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private String title;
    private String description;
    private boolean viewed;
}
