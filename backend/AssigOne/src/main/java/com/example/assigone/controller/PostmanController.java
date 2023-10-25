package com.example.assigone.controller;

import com.example.assigone.dto.PostmanDTO;
import com.example.assigone.service.PostmanService;
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
public class PostmanController {
    private final PostmanService postmanService;

    public PostmanController(PostmanService postmanService) {
        this.postmanService = postmanService;
    }

    @PostMapping("/addPostman")
    ResponseEntity<PostmanDTO> addPostman(@Valid @RequestBody PostmanDTO postmanDTO){
        PostmanDTO registeredUser = postmanService.savePostman(postmanDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/getPostman")
    public ResponseEntity<List<PostmanDTO>> findAllPostmen(){
        List<PostmanDTO> users = postmanService.getAllPostman();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/postmanById/{id}")
    public ResponseEntity<PostmanDTO> findPostmanById(@PathVariable("id") int id){
        PostmanDTO user = postmanService.getPostmanById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/postmanByName/{name}")
    public ResponseEntity<PostmanDTO> findPostmanByName(@PathVariable("name") String name){
        PostmanDTO user = postmanService.getPostmanByName(name);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/postman/{id}")
    ResponseEntity<PostmanDTO> updatePostman(@PathVariable("id") int id, @RequestBody PostmanDTO dto){
        PostmanDTO updatedUser = postmanService.updatePostman(id, dto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/postman/{id}")
    ResponseEntity<PostmanDTO> deletePostman(@PathVariable("id") int id){
        postmanService.deletePostman(id);
        return ResponseEntity.ok().build();
    }
}
