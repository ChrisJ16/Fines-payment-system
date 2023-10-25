package com.example.assigone.service;

import com.example.assigone.dto.FineDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface FineService {
    FineDTO saveFine(FineDTO dto);

    List<FineDTO> getAllFines();

    FineDTO getFineById(int id);

    FineDTO getFineByNote(String email);

    FineDTO updateFine(int id, FineDTO dto);

    void deleteFine(int id);
    List<FineDTO> getAllFinesByUserCnp(String CNP);

    String exportFineDetailsForUser(int id, String fileType);
}
