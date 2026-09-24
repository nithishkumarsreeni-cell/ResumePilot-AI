package com.resume.resumeanalyzer.service;

import com.resume.resumeanalyzer.entity.Resume;
import com.resume.resumeanalyzer.entity.User;
import com.resume.resumeanalyzer.repository.ResumeRepository;
import com.resume.resumeanalyzer.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ResumeService {


    private final ResumeRepository resumeRepository;

    private final UserRepository userRepository;


    public ResumeService(

            ResumeRepository resumeRepository,

            UserRepository userRepository

    ) {

        this.resumeRepository = resumeRepository;

        this.userRepository = userRepository;

    }





    // Find user by ID

    public User findUserById(Long userId) {


        return userRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

    }





    // Save uploaded resume

    public Resume saveResume(Resume resume) {


        return resumeRepository.save(resume);

    }





    // Get all resumes of a user

    public List<Resume> getResumesByUserId(Long userId) {


        return resumeRepository.findByUserId(userId);

    }





    // Find resume by ID

    public Resume getResumeById(Long id) {


        return resumeRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Resume not found"
                        )
                );

    }





    // Delete resume

    public void deleteResume(Long id) {


        Resume resume = getResumeById(id);


        resumeRepository.delete(resume);

    }


}