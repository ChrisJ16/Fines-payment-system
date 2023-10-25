package com.example.assigone.service.impl;

import com.example.assigone.dto.PostmanDTO;
import com.example.assigone.encrypt.PasswordEncoder;
import com.example.assigone.mapper.PostmanMapper;
import com.example.assigone.model.Postman;
import com.example.assigone.repository.PostmanRepository;
import com.example.assigone.service.PostmanService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class PostmanServiceImpl implements PostmanService{

    @Autowired
    private PostmanRepository postmanRepository;
    private PostmanMapper postmanMapper;
    private PasswordEncoder passwordEncoder = new PasswordEncoder();

    public PostmanServiceImpl(PostmanRepository postmanRepository, PostmanMapper postmanMapper){
        this.postmanMapper = postmanMapper;
        this.postmanRepository = postmanRepository;
    }
    @Override
    public PostmanDTO savePostman(PostmanDTO dto) {
        Postman savedPostman = postmanRepository.save(postmanMapper.toPostman(dto));
        return postmanMapper.toDTO(savedPostman);
    }

    @Override
    public List<PostmanDTO> getAllPostman() {
        List<Postman> postmen = postmanRepository.findAll();
        return postmen.stream().map(postmanMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public PostmanDTO getPostmanById(int id) {
        Optional<Postman> postman = postmanRepository.findById(id);
        if(postman.isPresent()){
            return postmanMapper.toDTO(postman.get());
        }else {
            throw  new InvalidParameterException("There is no postman with id " + id);
        }
    }

    @Override
    public PostmanDTO getPostmanByName(String name) {
        Postman postman = postmanRepository.findByName(name);
        return postmanMapper.toDTO(postman);
    }

    @Override
    public PostmanDTO updatePostman(int id, PostmanDTO dto) {
        Optional<Postman> postman = postmanRepository.findById(id);
        if(postman.isPresent()){
            Postman updatedPostman = postman.get();
            updatedPostman.setName(dto.getName());

            if(!dto.getPassword().equals(updatedPostman.getPassword()))
                updatedPostman.setPassword(passwordEncoder.encode(dto.getPassword()));
            else
                updatedPostman.setPassword(dto.getPassword());

            updatedPostman.setCnp(dto.getCnp());
            updatedPostman.setPostmanId(dto.getPostmanId());
            updatedPostman.setExperience(dto.getExperience());
            updatedPostman.setPostmanBadge(dto.getPostmanBadge());
            postmanRepository.save(updatedPostman);
            return postmanMapper.toDTO(updatedPostman);
        }
        else {
            throw new InvalidParameterException("There is no policeman with id: " + id);
        }
    }

    @Override
    public void deletePostman(int id) {
        postmanRepository.deleteById(id);
    }
}
