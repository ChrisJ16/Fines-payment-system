package com.example.assigone.mapper;

import com.example.assigone.dto.FineDTO;
import com.example.assigone.model.Fine;
import org.springframework.stereotype.Component;

@Component
public class FineMapper {
    public Fine toFine(FineDTO dto){
        Fine fine = new Fine();
        fine.setId(dto.getId());
        fine.setSum(dto.getSum());
        fine.setDate(dto.getDate());
        fine.setNote(dto.getNote());
        fine.setUser(dto.getUser());
        fine.setPaid(dto.isPaid());

        return fine;
    }

    public FineDTO toDTO(Fine fine){
        FineDTO dto = new FineDTO();
        dto.setId(fine.getId());
        dto.setSum(fine.getSum());
        dto.setDate(fine.getDate());
        dto.setNote(fine.getNote());
        dto.setUser(fine.getUser());
        dto.setPaid(fine.isPaid());

        return dto;
    }
}
