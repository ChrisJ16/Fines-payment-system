package com.example.assigone.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostmanDTO {
    private int id;
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Name should contain only letters")
    private String name;

    private String password;
    @Pattern(regexp = "^[0-9]{7}$", message = "CNP should contain 7 digits")
    private String cnp;
    private String postmanId;
    @Digits(integer = 3, message = "Postman badge should contain a maximum of 3 digits", fraction = 0)
    private int postmanBadge;
    @Digits(integer = 2, message = "Experience should contain a maximum of 2 digits", fraction = 0)
    private int experience;
}
