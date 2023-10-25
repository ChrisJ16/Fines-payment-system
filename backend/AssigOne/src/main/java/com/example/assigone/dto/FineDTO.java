package com.example.assigone.dto;

import com.example.assigone.model.User;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FineDTO {
    private int Id;
    private int sum;
    private String note;
    private Date date;
    private boolean isPaid;
    private User user;
}
