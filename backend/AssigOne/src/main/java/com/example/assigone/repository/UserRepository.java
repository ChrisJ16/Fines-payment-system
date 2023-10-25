package com.example.assigone.repository;

import com.example.assigone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByName(String name);

    User findByNameAndPassword(String name, String password);

    User findUserByCnp(String cnp);
}
