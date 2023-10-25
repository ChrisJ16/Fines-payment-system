package com.example.assigone.service.impl;

import com.example.assigone.dto.FineDTO;
import com.example.assigone.dto.UserDTO;
import com.example.assigone.exporter.FileExporter;
import com.example.assigone.exporter.XMLFileExporter;
import com.example.assigone.exporter.wrappers.Fines;
import com.example.assigone.mapper.FineMapper;
import com.example.assigone.model.FineList;
import com.example.assigone.model.User;
import com.example.assigone.repository.FineRepository;
import com.example.assigone.service.FineService;
import com.example.assigone.model.Fine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.assigone.repository.UserRepository;
import com.example.assigone.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class FineServiceImpl implements FineService{
    @Autowired
    private FineRepository fineRepository;
    private UserRepository userRepository;
    private FineMapper fineMapper;

    public FineServiceImpl(FineRepository fineRepository, FineMapper fineMapper, UserRepository userRepository){
        this.fineMapper = fineMapper;
        this.fineRepository = fineRepository;
        this.userRepository = userRepository;
    }

    @Override
    public FineDTO saveFine(FineDTO dto) {
        Fine savedFine = fineRepository.save(fineMapper.toFine(dto));
        return fineMapper.toDTO(savedFine);
        /*Optional<User> user = userRepository.findById(dto.getUser().getId());
        if(user.isPresent()){
            User updatedUser = user.get();
            dto.setUser(updatedUser);
            Fine savedFine = fineRepository.save(fineMapper.toFine(dto));
            updatedUser.getFinesList().add(fineMapper.toFine(dto));
            userRepository.save(updatedUser);
            return fineMapper.toDTO(savedFine);
        }
        else{
            throw new InvalidParameterException("There is no user with id: " + dto.getUser().getId());
        }
        */
    }

    public List<FineDTO> getAllFines() {
        List<Fine> fines = fineRepository.findAll();
        return fines.stream().map(fineMapper::toDTO).collect(Collectors.toList());
    }

    public FineDTO getFineById(int id) {
        Optional<Fine> fine = fineRepository.findById(id);
        if(fine.isPresent()){
            return fineMapper.toDTO(fine.get());
        }
        else{
            throw  new InvalidParameterException("There is no fine with id: " + id);
        }
    }

    public FineDTO getFineByNote(String txt) {
        Fine fine = fineRepository.findByNote(txt);
        return fineMapper.toDTO(fine);
    }

    public FineDTO updateFine(int id, FineDTO dto) {
        Optional<Fine> fine = fineRepository.findById(id);
        if(fine.isPresent()){
            Fine updatedFine = fine.get();
            updatedFine.setUser(dto.getUser());
            updatedFine.setSum(dto.getSum());
            updatedFine.setDate(dto.getDate());
            updatedFine.setNote(dto.getNote());
            updatedFine.setPaid(dto.isPaid());
            fineRepository.save(updatedFine);
            return fineMapper.toDTO(updatedFine);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

    @Override
    public void deleteFine(int id) {
        fineRepository.deleteById(id);
    }

    @Override
    public List<FineDTO> getAllFinesByUserCnp(String CNP) {
        User user = userRepository.findUserByCnp(CNP);
        if(user != null){
            List<Fine> fines = user.getFinesList();
            return fines.stream().map(fineMapper::toDTO).collect(Collectors.toList());
        }
        else{
            throw  new InvalidParameterException("There is no user with CNP: " + CNP);
        }
    }

    @Override
    public String exportFineDetailsForUser(int id, String fileType) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
           throw  new InvalidParameterException("There is no user with id: " + id);
        }
        FineList fineList = new FineList(
                user.get().getName(),
                user.get().getFinesList()
        );
        FileExporter fileExporter;

        if(fileType.equals("xml")) {
            fileExporter = new XMLFileExporter();
            return fileExporter.exportData(fineList);
        }else if(fileType.equals("txt")){
            fileExporter = new XMLFileExporter();
            return fileExporter.exportData(fineList);
        }
        return null;
    }


}
