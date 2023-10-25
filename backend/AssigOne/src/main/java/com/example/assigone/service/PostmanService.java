package com.example.assigone.service;

import com.example.assigone.dto.PolicemanDTO;
import com.example.assigone.dto.PostmanDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PostmanService {
    PostmanDTO savePostman(PostmanDTO dto);
    List<PostmanDTO> getAllPostman();

    PostmanDTO getPostmanById(int id);

    PostmanDTO getPostmanByName(String email);

    PostmanDTO updatePostman(int id, PostmanDTO dto);

    void deletePostman(int id);
}
