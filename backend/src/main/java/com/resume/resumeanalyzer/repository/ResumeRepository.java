package com.resume.resumeanalyzer.repository;

import com.resume.resumeanalyzer.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    // Get all resumes uploaded by a user
    List<Resume> findByUserId(Long userId);

    // Get a specific resume only if it belongs to the user
    Optional<Resume> findByIdAndUserId(Long id, Long userId);

    // Get the latest uploaded resume of a user
    Optional<Resume> findTopByUserIdOrderByUploadedDateDesc(Long userId);

}