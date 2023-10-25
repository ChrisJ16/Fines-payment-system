package com.example.assigone.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private int id;
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Name should contain only letters")
    private String name;
    private String password;
    @Pattern(regexp = "^[0-9]{7}$", message = "CNP should contain 7 digits")
    private String cnp;
    private boolean loggedIn;
}
