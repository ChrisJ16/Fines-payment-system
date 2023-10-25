package com.example.assigone.service.impl;

import com.example.assigone.dto.LawDTO;
import com.example.assigone.mapper.LawMapper;
import com.example.assigone.model.Laws;
import com.example.assigone.repository.LawRepository;
import com.example.assigone.service.LawService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class LawServiceImpl implements LawService {
    @Autowired
    private LawRepository lawRepository;
    private LawMapper lawMapper;

    public LawServiceImpl(LawRepository lawRepository, LawMapper lawMapper){
        this.lawRepository = lawRepository;
        this.lawMapper = lawMapper;
    }
    @Override
    public LawDTO saveLaw(LawDTO dto) {
        Laws savedLaw = lawRepository.save(lawMapper.toLaw(dto));
        return lawMapper.toDTO(savedLaw);
    }

    @Override
    public List<LawDTO> getAllLaws() {
        List<Laws> laws = lawRepository.findAll();
        return laws.stream().map(lawMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public LawDTO getLawById(int id) {
        return null;
    }

    @Override
    public LawDTO updateLaw(int id, LawDTO dto) {
        Optional<Laws> law = lawRepository.findById(id);
        if(law.isPresent()){
            Laws updatedLaw = law.get();
            updatedLaw.setDate(dto.getDate());
            updatedLaw.setTitle(dto.getTitle());
            updatedLaw.setDescription(dto.getDescription());
            updatedLaw.setViewed(dto.isViewed());
            return lawMapper.toDTO(updatedLaw);
        }
        else{
            throw  new InvalidParameterException("There is no law with id: " + id);
        }
    }

    @Override
    public void deleteLaw(int id) {
        lawRepository.deleteById(id);
    }

    @Override
    public LawDTO setViewed(int id) {
        Optional<Laws> law = lawRepository.findById(id);
        if(law.isPresent()){
            Laws updatedLaw = law.get();
            updatedLaw.setViewed(true);
            lawRepository.save(updatedLaw);
            return lawMapper.toDTO(updatedLaw);
        }
        else{
            throw  new InvalidParameterException("There is no law with id: " + id);
        }
    }
}
