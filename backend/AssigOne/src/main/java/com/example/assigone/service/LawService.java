package com.example.assigone.service;

import com.example.assigone.dto.LawDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface LawService {
    LawDTO saveLaw(LawDTO dto);
    List<LawDTO> getAllLaws();
    LawDTO getLawById(int id);
    LawDTO updateLaw(int id, LawDTO dto);
    void deleteLaw(int id);

    LawDTO setViewed(int id);
}
