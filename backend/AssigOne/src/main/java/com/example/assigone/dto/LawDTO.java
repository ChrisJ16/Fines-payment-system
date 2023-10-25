package com.example.assigone.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LawDTO {
    private int id;
    private Date date;
    private String title;
    private String description;
    private boolean viewed;
}
