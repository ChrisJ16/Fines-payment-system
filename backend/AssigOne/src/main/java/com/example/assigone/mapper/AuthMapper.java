package com.example.assigone.mapper;

import com.example.assigone.dto.AuthDTO;
import com.example.assigone.model.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {
    public AuthDTO toDTO(User user){
        if(user != null){
            AuthDTO dto = new AuthDTO();
            dto.setId(user.getId());
            dto.setUsername(user.getName());
            dto.setPassword(user.getPassword());
            switch (user.getClass().getName()){
                case "com.example.assigone.model.Policeman":
                    dto.setRole("policeman");
                    break;
                case "com.example.assigone.model.Postman":
                    dto.setRole("postman");
                    break;
                default:
                    dto.setRole("user");
            }
            return dto;
        }
        return null;
    }
}
