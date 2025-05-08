package com.blogspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogspring.model.Credentials;

public interface CredentialsRepository extends JpaRepository<Credentials, String> {

    Credentials findByUsername(String username);
}
