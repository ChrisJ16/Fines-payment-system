package com.example.assigone.controller;

import com.example.assigone.dto.FineDTO;
import com.example.assigone.model.Fine;
import com.example.assigone.service.FineService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Setter
@Getter
@CrossOrigin
public class FineController {
    private final FineService fineService;

    public FineController(FineService fineService) {
        this.fineService = fineService;
    }

    @PostMapping("/addFine")
    ResponseEntity<FineDTO> addFine(@RequestBody FineDTO fineDTO){
        FineDTO registeredFine = fineService.saveFine(fineDTO);
        return ResponseEntity.ok(registeredFine);
    }

    @GetMapping("/getFines")
    public ResponseEntity<List<FineDTO>> findAllFines(){
        List<FineDTO> fines = fineService.getAllFines();
        return ResponseEntity.ok(fines);
    }
    @GetMapping("/fineById/{id}")
    public ResponseEntity<FineDTO> findFineById(@PathVariable("id") int id){
        FineDTO fine = fineService.getFineById(id);
        return ResponseEntity.ok(fine);
    }
    @GetMapping("/fineByNote/{name}")
    public ResponseEntity<FineDTO> findFineByNote(@PathVariable("name") String name){
        FineDTO fine = fineService.getFineByNote(name);
        return ResponseEntity.ok(fine);
    }

    @PutMapping("/fine/{id}")
    ResponseEntity<FineDTO> updateFine(@PathVariable("id") int id, @RequestBody FineDTO dto){
        FineDTO updatedFine = fineService.updateFine(id, dto);
        return ResponseEntity.ok(updatedFine);
    }

    @DeleteMapping("/fine/{id}")
    ResponseEntity<FineDTO> deleteFine(@PathVariable("id") int id){
        fineService.deleteFine(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/finesCnp/{CNP}")
    ResponseEntity<List<FineDTO>> findAllFinesByUserCnp(@PathVariable("CNP") String CNP){
        List<FineDTO> fines = fineService.getAllFinesByUserCnp(CNP);
        return ResponseEntity.ok(fines);
    }

    @GetMapping("/exportFine/{id}/{fileType}")
    public ResponseEntity exportFineDetailsForUser(@PathVariable("id") int id, @PathVariable("fileType") String fileType) {
        return ResponseEntity.ok(fineService.exportFineDetailsForUser(id, fileType));
    }
}
