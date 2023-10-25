package com.example.assigone.service;

import com.example.assigone.dto.AuthDTO;
import com.example.assigone.dto.UserDTO;
import com.example.assigone.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserService {
    UserDTO saveUser(UserDTO dto);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(int id);

    UserDTO getUserByName(String email);

    UserDTO updateUser(int id, UserDTO dto);

    void deleteUser(int id);

    AuthDTO findByNameAndPassword(AuthDTO dto);

    UserDTO addFine(int id, int fineId);

    UserDTO deleteFine(int id, int fineId);

    UserDTO payFine(int id, int fineId);


    UserDTO logIn(int id);

    UserDTO logOut(int id);

}
