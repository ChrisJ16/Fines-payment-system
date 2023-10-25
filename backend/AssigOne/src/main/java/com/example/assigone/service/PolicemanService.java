package com.example.assigone.service;

import com.example.assigone.dto.PolicemanDTO;
import com.example.assigone.dto.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PolicemanService {
    PolicemanDTO savePoliceman(PolicemanDTO dto);

    List<PolicemanDTO> getAllPoliceman();

    PolicemanDTO getPolicemanById(int id);

    PolicemanDTO getPolicemanByName(String email);

    PolicemanDTO updatePoliceman(int id, PolicemanDTO dto);

    void deletePoliceman(int id);
}
