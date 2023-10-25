package com.example.assigone.repository;

import com.example.assigone.model.Policeman;
import com.example.assigone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicemanRepository extends JpaRepository<Policeman, Integer> {
    Policeman findByName(String name);
}
