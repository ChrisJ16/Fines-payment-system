package com.example.assigone.mapper;

import com.example.assigone.dto.LawDTO;
import com.example.assigone.model.Laws;
import org.springframework.stereotype.Component;

@Component
public class LawMapper {
    public Laws toLaw(LawDTO dto){
        Laws law = new Laws();
        law.setId(dto.getId());
        law.setDate(dto.getDate());
        law.setTitle(dto.getTitle());
        law.setDescription(dto.getDescription());
        law.setViewed(dto.isViewed());

        return law;
    }

    public LawDTO toDTO(Laws law){
        LawDTO dto = new LawDTO();
        dto.setId(law.getId());
        dto.setDate(law.getDate());
        dto.setTitle(law.getTitle());
        dto.setDescription(law.getDescription());
        dto.setViewed(law.isViewed());

        return dto;
    }
}
