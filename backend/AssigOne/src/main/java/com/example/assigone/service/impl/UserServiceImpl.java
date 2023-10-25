package com.example.assigone.service.impl;

import com.example.assigone.dto.AuthDTO;
import com.example.assigone.dto.UserDTO;
import com.example.assigone.encrypt.PasswordEncoder;
import com.example.assigone.mapper.AuthMapper;
import com.example.assigone.model.Fine;
import com.example.assigone.repository.FineRepository;
import com.example.assigone.service.UserService;
import com.example.assigone.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.assigone.repository.UserRepository;
import com.example.assigone.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    private FineRepository fineRepository;
    private UserMapper userMapper;
    private AuthMapper authMapper;
    private PasswordEncoder passwordEncoder = new PasswordEncoder();

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, AuthMapper authMapper, FineRepository fineRepository){
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.authMapper = authMapper;
        this.fineRepository = fineRepository;
    }


    public UserDTO  saveUser(UserDTO dto) {
        User savedUser = userRepository.save(userMapper.toUser(dto));
        return userMapper.toDTO(savedUser);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return userMapper.toDTO(user.get());
        }
        else{
            throw  new InvalidParameterException("There is no user with id: " + id);
        }
    }

    public UserDTO getUserByName(String name) {
        User user = userRepository.findByName(name);
        return userMapper.toDTO(user);
    }

    public UserDTO updateUser(int id, UserDTO dto) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User updatedUser = user.get();
            updatedUser.setName(dto.getName());
            updatedUser.setCnp(dto.getCnp());

            if(!dto.getPassword().equals(updatedUser.getPassword()))
                updatedUser.setPassword(passwordEncoder.encode(dto.getPassword()));
            else
                updatedUser.setPassword(dto.getPassword());

            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public AuthDTO findByNameAndPassword(AuthDTO dto) {
        SMSservice sms = new SMSservice();
        sms.sendSMS(dto.getUsername());
        return authMapper.toDTO(userRepository.findByNameAndPassword(dto.getUsername(), passwordEncoder.encode(dto.getPassword())));
    }

    @Override
    public UserDTO addFine(int id, int fineId) {
        Optional<User> user = userRepository.findById(id);
        Optional<Fine> fine = fineRepository.findById(fineId);
        if(user.isPresent() && fine.isPresent()){
            User updatedUser = user.get();
            updatedUser.getFinesList().add(fine.get());
            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

    @Override
    public UserDTO deleteFine(int id, int fineId) {
        Optional<User> user = userRepository.findById(id);
        Optional<Fine> fine = fineRepository.findById(fineId);
        if(user.isPresent() && fine.isPresent()){
            User updatedUser = user.get();
            updatedUser.getFinesList().remove(fine.get());
            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

    @Override
    public UserDTO payFine(int id, int fineId) {
        Optional<User> user = userRepository.findById(id);
        Optional<Fine> fine = fineRepository.findById(fineId);
        if(user.isPresent() && fine.isPresent()){
            User updatedUser = user.get();
            // I want to set the fine as paid
            fine.get().setPaid(true);
            updatedUser.getFinesList().remove(fine.get());

            fineRepository.save(fine.get());

            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }


    @Override
    public UserDTO logIn(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User updatedUser = user.get();
            updatedUser.setLoggedIn(true);
            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

    @Override
    public UserDTO logOut(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User updatedUser = user.get();
            updatedUser.setLoggedIn(false);
            userRepository.save(updatedUser);
            return userMapper.toDTO(updatedUser);
        }
        else{
            throw  new InvalidParameterException("There is no user with id" + id);
        }
    }

}
