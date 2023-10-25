package com.example.assigone.repository;

import com.example.assigone.model.Policeman;
import com.example.assigone.model.Postman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostmanRepository extends JpaRepository<Postman, Integer> {
    Postman findByName(String name);
}
