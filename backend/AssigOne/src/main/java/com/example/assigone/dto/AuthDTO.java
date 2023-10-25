package com.example.assigone.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {
    private String username;
    private String password;
    private String role;
    private int id;
}
