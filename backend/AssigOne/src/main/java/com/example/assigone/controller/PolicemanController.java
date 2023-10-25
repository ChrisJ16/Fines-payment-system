package com.example.assigone.controller;

import com.example.assigone.dto.PolicemanDTO;
import com.example.assigone.model.Policeman;
import com.example.assigone.service.PolicemanService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Setter
@Getter
@CrossOrigin
public class PolicemanController {
    private final PolicemanService policemanService;

    public PolicemanController(PolicemanService policemanService) {
        this.policemanService = policemanService;
    }

    @PostMapping("/addPoliceman")
    ResponseEntity<PolicemanDTO> addPoliceman(@Valid @RequestBody PolicemanDTO policemanDTO){
        PolicemanDTO registeredUser = policemanService.savePoliceman(policemanDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/getPoliceman")
    public ResponseEntity<List<PolicemanDTO>> findAllPolicemen(){
        List<PolicemanDTO> users = policemanService.getAllPoliceman();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/policemanById/{id}")
    public ResponseEntity<PolicemanDTO> findPolicemanById(@PathVariable("id") int id){
        PolicemanDTO user = policemanService.getPolicemanById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/policemanByName/{name}")
    public ResponseEntity<PolicemanDTO> findPolicemanByName(@PathVariable("name") String name){
        PolicemanDTO user = policemanService.getPolicemanByName(name);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/policeman/{id}")
    ResponseEntity<PolicemanDTO> updatePoliceman(@PathVariable("id") int id, @RequestBody PolicemanDTO dto){
        PolicemanDTO updatedUser = policemanService.updatePoliceman(id, dto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/policeman/{id}")
    ResponseEntity<PolicemanDTO> deletePoliceman(@PathVariable("id") int id){
        policemanService.deletePoliceman(id);
        return ResponseEntity.ok().build();
    }
}
