package com.example.assigone.controller;

import com.example.assigone.dto.UserDTO;
import com.example.assigone.model.User;
import com.example.assigone.service.UserService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Setter
@Getter
@CrossOrigin
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    ResponseEntity<UserDTO> addUser(@Valid @RequestBody UserDTO userdto){
        UserDTO registeredUser = userService.saveUser(userdto);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDTO>> findAllUsers(){
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/userById/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable("id") int id){
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/userByName/{name}")
    public ResponseEntity<UserDTO> findUserByName(@PathVariable("name") String name){
        UserDTO user = userService.getUserByName(name);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}")
    ResponseEntity<UserDTO> updateUser(@PathVariable("id") int id, @RequestBody UserDTO dto){
        UserDTO updatedUser = userService.updateUser(id, dto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    ResponseEntity<UserDTO> deleteUser(@PathVariable("id") int id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/{id}/addFine/{fineId}")
    ResponseEntity<UserDTO> addFine(@PathVariable("id") int id, @PathVariable("fineId") int fineId){
        UserDTO user = userService.addFine(id, fineId);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/user/{id}/deleteFine/{fineId}")
    ResponseEntity<UserDTO> deleteFine(@PathVariable("id") int id, @PathVariable("fineId") int fineId){
        UserDTO user = userService.deleteFine(id, fineId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/{id}/payFine/{fineId}")
    ResponseEntity<UserDTO> payFine(@PathVariable("id") int id, @PathVariable("fineId") int fineId){
        UserDTO user = userService.payFine(id, fineId);
        return ResponseEntity.ok(user);
    }


    @PutMapping("/user/logIn/{id}")
    ResponseEntity<UserDTO> logIn(@PathVariable("id") int id){
        UserDTO user = userService.logIn(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/logOut/{id}")
    ResponseEntity<UserDTO> logOut(@PathVariable("id") int id){
        UserDTO user = userService.logOut(id);
        return ResponseEntity.ok(user);
    }

}
