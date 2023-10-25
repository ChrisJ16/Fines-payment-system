package com.example.assigone.repository;

import com.example.assigone.model.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FineRepository extends JpaRepository<Fine,Integer>{
    Fine findByNote(String name);
}
