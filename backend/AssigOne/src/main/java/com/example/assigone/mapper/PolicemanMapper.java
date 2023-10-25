package com.example.assigone.mapper;

import com.example.assigone.dto.PolicemanDTO;
import com.example.assigone.encrypt.PasswordEncoder;
import com.example.assigone.model.Policeman;
import org.springframework.stereotype.Component;

@Component
public class PolicemanMapper {
    private PasswordEncoder passwordEncoder = new PasswordEncoder();
    public Policeman toPoliceman(PolicemanDTO dto){
        Policeman policeman = new Policeman();
        policeman.setId(dto.getId());
        policeman.setName(dto.getName());
        policeman.setPassword(passwordEncoder.encode(dto.getPassword()));
        policeman.setCnp(dto.getCnp());
        policeman.setGrade(dto.getGrade());
        policeman.setOfficerId(dto.getOfficerId());
        policeman.setPoliceBadge(dto.getPoliceBadge());

        return policeman;
    }

    public PolicemanDTO toDTO(Policeman policeman){
        PolicemanDTO dto = new PolicemanDTO();
        dto.setId(policeman.getId());
        dto.setName(policeman.getName());
        dto.setPassword(policeman.getPassword());
        dto.setCnp(policeman.getCnp());
        dto.setGrade(policeman.getGrade());
        dto.setOfficerId(policeman.getOfficerId());
        dto.setPoliceBadge(policeman.getPoliceBadge());

        return dto;
    }
}
