package com.example.assigone.mapper;

import com.example.assigone.dto.PostmanDTO;
import com.example.assigone.encrypt.PasswordEncoder;
import com.example.assigone.model.Postman;
import org.springframework.stereotype.Component;

@Component
public class PostmanMapper {
    private PasswordEncoder passwordEncoder = new PasswordEncoder();
    public Postman toPostman(PostmanDTO dto){
        Postman postman = new Postman();
        postman.setId(dto.getId());
        postman.setName(dto.getName());
        postman.setPassword(passwordEncoder.encode(dto.getPassword()));
        postman.setCnp(dto.getCnp());
        postman.setPostmanBadge(dto.getPostmanBadge());
        postman.setPostmanId(dto.getPostmanId());
        postman.setExperience(dto.getExperience());

        return postman;
    }

    public PostmanDTO toDTO(Postman postman){
        PostmanDTO dto = new PostmanDTO();
        dto.setId(postman.getId());
        dto.setName(postman.getName());
        dto.setPassword(postman.getPassword());
        dto.setCnp(postman.getCnp());
        dto.setPostmanBadge(postman.getPostmanBadge());
        dto.setPostmanId(postman.getPostmanId());
        dto.setExperience(postman.getExperience());

        return dto;
    }
}
