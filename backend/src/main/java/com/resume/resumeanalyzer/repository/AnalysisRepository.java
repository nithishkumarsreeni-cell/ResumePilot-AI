package com.resume.resumeanalyzer.repository;

import com.resume.resumeanalyzer.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

    Optional<Analysis> findByResumeId(Long resumeId);

    List<Analysis> findByResumeUserId(Long userId);

}