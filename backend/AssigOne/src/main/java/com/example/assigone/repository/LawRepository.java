package com.example.assigone.repository;

import com.example.assigone.model.Laws;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LawRepository extends JpaRepository<Laws, Integer> {
}
