package com.example.assigone.controller;

import com.example.assigone.dto.AuthDTO;
import com.example.assigone.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class LoginController {
    private final UserService userService;
    public LoginController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("")
    public ResponseEntity login(@RequestBody AuthDTO auth){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findByNameAndPassword(auth));
    }
}
