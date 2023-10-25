package com.example.assigone.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PolicemanDTO {
    private int id;
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Name should contain only letters")
    private String name;
    private String password;
    @Pattern(regexp = "^[0-9]{7}$", message = "CNP should contain 7 digits")
    private String cnp;
    private String officerId;
    @Digits(integer = 3, message = "Police badge should contain a maximum of 3 digits", fraction = 0)
    private int policeBadge;
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Grade should contain only letters")
    private String grade;

}
