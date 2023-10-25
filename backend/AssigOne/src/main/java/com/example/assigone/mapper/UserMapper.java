package com.example.assigone.mapper;

import com.example.assigone.encrypt.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.example.assigone.model.User;
import com.example.assigone.dto.UserDTO;

@Component
public class UserMapper {
    private PasswordEncoder passwordEncoder = new PasswordEncoder();
    public User toUser(UserDTO dto){
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setCnp(dto.getCnp());
        user.setLoggedIn(dto.isLoggedIn());

        return user;
    }

    public UserDTO toDTO(User user){
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setPassword(user.getPassword());
        dto.setCnp(user.getCnp());
        dto.setLoggedIn(user.isLoggedIn());

        return dto;
    }
}
