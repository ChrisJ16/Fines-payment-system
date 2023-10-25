package com.example.assigone.controller;

import com.example.assigone.dto.LawDTO;
import com.example.assigone.service.LawService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Setter
@Getter
@CrossOrigin
public class LawController {
    private final LawService lawService;

    public LawController(LawService lawService) {
        this.lawService = lawService;
    }


    @PostMapping("/addLaw")
    ResponseEntity<LawDTO> addLaw(@RequestBody LawDTO lawdto){
        LawDTO registeredLaw = lawService.saveLaw(lawdto);
        return ResponseEntity.ok(registeredLaw);
    }
    @GetMapping("/getLaws")
    public ResponseEntity<List<LawDTO>> findAllLaws(){
        List<LawDTO> laws = lawService.getAllLaws();
        return ResponseEntity.ok(laws);
    }

    @PutMapping("/law/{id}")
    ResponseEntity<LawDTO> updateLaw(@PathVariable("id") int id, @RequestBody LawDTO dto){
        LawDTO updatedLaw = lawService.updateLaw(id, dto);
        return ResponseEntity.ok(updatedLaw);
    }

    @DeleteMapping("/law/{id}")
    ResponseEntity<LawDTO> deleteLaw(@PathVariable("id") int id){
        lawService.deleteLaw(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/law/{id}/viewed")
    ResponseEntity<LawDTO> setViewed(@PathVariable("id") int id){
        LawDTO viewedLaw = lawService.setViewed(id);
        return ResponseEntity.ok(viewedLaw);
    }
}
