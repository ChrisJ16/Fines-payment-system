package com.example.assigone.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ActivityDTO {
    private int id;

    private int userId;
    private String username;
    private String action;
    private Date date;
}
