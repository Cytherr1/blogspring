package com.blogspring.service;

import com.blogspring.dto.CommentDto;
import com.blogspring.model.Comment;
import com.blogspring.model.Post;
import com.blogspring.repository.CommentRepository;
import com.blogspring.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    
    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }
    
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
    
    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found with id: " + id));
    }
    
    public Comment createComment(Long postId, CommentDto commentDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));
        
        Comment comment = new Comment();
        comment.setAuthor(commentDto.getAuthor());
        comment.setContent(commentDto.getContent());
        comment.setPost(post);
        
        return commentRepository.save(comment);
    }
    
    public Comment updateComment(Long id, CommentDto commentDto) {
        Comment comment = getCommentById(id);
        comment.setAuthor(commentDto.getAuthor());
        comment.setContent(commentDto.getContent());
        return commentRepository.save(comment);
    }
    
    public void deleteComment(Long id) {
        Comment comment = getCommentById(id);
        commentRepository.delete(comment);
    }
}