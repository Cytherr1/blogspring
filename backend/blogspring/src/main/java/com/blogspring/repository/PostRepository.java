package com.blogspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogspring.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Spring Data JPA provides basic CRUD operations
}