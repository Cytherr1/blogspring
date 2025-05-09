package com.blogspring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blogspring.model.Post;
import com.blogspring.repository.PostRepository;

@RestController
@CrossOrigin
@RequestMapping(path="/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping(path="/getAllPosts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping(path="/getPost")
    public Post getPost(@RequestParam Long id) {
        return postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
    }

    @PutMapping(path="/editPost")
    public void deletePost(@RequestParam Long id, @RequestBody Map <String, String> body) {
        Post post = postRepository
        .findById(id).orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        post.setMessage(body.get("message"));
        postRepository.save(post);
    }

    @DeleteMapping(path="/deletePost")
    public void deletePost(@RequestParam Long id) {
        postRepository.deleteById(id);
    }

    @GetMapping(path="/getUserPosts")
    public List<Post> getUserPosts(@RequestParam String userid) {
        return postRepository.findByUserid(userid);
    }

    @PostMapping(path="/createPost")
    public void createPost(@RequestBody Map<String, String> body) {
         
        Post post = new Post();
        post.setMessage(body.get("message"));
        post.setUserid(body.get("userid"));
        
        postRepository.save(post);
    }
}
