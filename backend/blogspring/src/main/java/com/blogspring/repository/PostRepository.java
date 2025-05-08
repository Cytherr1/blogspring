package com.blogspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogspring.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
