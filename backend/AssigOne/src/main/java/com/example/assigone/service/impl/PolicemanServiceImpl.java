package com.example.assigone.service.impl;

import com.example.assigone.dto.PolicemanDTO;
import com.example.assigone.encrypt.PasswordEncoder;
import com.example.assigone.mapper.PolicemanMapper;
import com.example.assigone.model.Policeman;
import com.example.assigone.repository.PolicemanRepository;
import com.example.assigone.service.PolicemanService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class PolicemanServiceImpl implements PolicemanService {

    @Autowired
    private PolicemanRepository policemanRepository;
    private PolicemanMapper policemanMapper;
    private PasswordEncoder passwordEncoder = new PasswordEncoder();

    public PolicemanServiceImpl(PolicemanRepository policemanRepository, PolicemanMapper policemanMapper){
        this.policemanMapper = policemanMapper;
        this.policemanRepository = policemanRepository;
    }
    @Override
    public PolicemanDTO savePoliceman(PolicemanDTO dto) {
        Policeman savedPoliceman = policemanRepository.save(policemanMapper.toPoliceman(dto));
        return policemanMapper.toDTO(savedPoliceman);
    }

    @Override
    public List<PolicemanDTO> getAllPoliceman() {
        List<Policeman> policemen = policemanRepository.findAll();
        return policemen.stream().map(policemanMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public PolicemanDTO getPolicemanById(int id) {
        Optional<Policeman> policeman = policemanRepository.findById(id);
        if(policeman.isPresent()){
            return policemanMapper.toDTO(policeman.get());
        }
        else{
            throw  new InvalidParameterException("There is no policeman with id " + id);
        }
    }

    @Override
    public PolicemanDTO getPolicemanByName(String name) {
        Policeman policeman = policemanRepository.findByName(name);
        return policemanMapper.toDTO(policeman);
    }

    @Override
    public PolicemanDTO updatePoliceman(int id, PolicemanDTO dto) {
        Optional<Policeman> policeman = policemanRepository.findById(id);
        if(policeman.isPresent()){
            Policeman updatedPoliceman = policeman.get();
            updatedPoliceman.setName(dto.getName());

            if(!dto.getPassword().equals(updatedPoliceman.getPassword()))
                updatedPoliceman.setPassword(passwordEncoder.encode(dto.getPassword()));
            else
                updatedPoliceman.setPassword(dto.getPassword());

            updatedPoliceman.setCnp(dto.getCnp());
            updatedPoliceman.setOfficerId(dto.getOfficerId());
            updatedPoliceman.setPoliceBadge(dto.getPoliceBadge());
            updatedPoliceman.setGrade(dto.getGrade());
            policemanRepository.save(updatedPoliceman);
            return policemanMapper.toDTO(updatedPoliceman);
        }
        else {
            throw new InvalidParameterException("There is no policeman with id: " + id);
        }
    }

    @Override
    public void deletePoliceman(int id) {
        policemanRepository.deleteById(id);
    }
}
