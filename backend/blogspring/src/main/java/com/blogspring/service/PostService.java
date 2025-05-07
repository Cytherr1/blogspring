package com.blogspring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogspring.dto.PostDto;
import com.blogspring.model.Post;
import com.blogspring.repository.PostRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PostService {

    private final PostRepository postRepository;
    
    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
    
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
    }
    
    public Post createPost(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        return postRepository.save(post);
    }
    
    public Post updatePost(Long id, PostDto postDto) {
        Post post = getPostById(id);
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        return postRepository.save(post);
    }
    
    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }
}