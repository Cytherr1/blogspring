package com.blogspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogspring.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	List<Post> findByUserid(String useridString);
}
