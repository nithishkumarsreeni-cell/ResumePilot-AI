package com.resume.resumeanalyzer.controller;

import com.resume.resumeanalyzer.dto.AnalysisResponse;
import com.resume.resumeanalyzer.entity.Analysis;
import com.resume.resumeanalyzer.entity.Resume;
import com.resume.resumeanalyzer.repository.AnalysisRepository;
import com.resume.resumeanalyzer.repository.ResumeRepository;
import com.resume.resumeanalyzer.service.AnalysisService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalysisController {

    private final AnalysisService analysisService;
    private final ResumeRepository resumeRepository;
    private final AnalysisRepository analysisRepository;

    public AnalysisController(
            AnalysisService analysisService,
            ResumeRepository resumeRepository,
            AnalysisRepository analysisRepository
    ) {

        this.analysisService = analysisService;
        this.resumeRepository = resumeRepository;
        this.analysisRepository = analysisRepository;

    }

    // Secure Resume Analysis API
    @PostMapping("/{resumeId}/{userId}")
    public AnalysisResponse analyzeResume(
            @PathVariable Long resumeId,
            @PathVariable Long userId
    ) {

        System.out.println("====================================");
        System.out.println("Resume ID      = " + resumeId);
        System.out.println("User ID        = " + userId);

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found.")
                );

        System.out.println("Resume Owner ID = " + resume.getUser().getId());
        System.out.println("====================================");

        if (!resume.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to analyze this resume.");
        }

        Analysis analysis = analysisService.analyzeResume(resume);

        return new AnalysisResponse(analysis);
    }

    // Dashboard History API
    @GetMapping("/history/{userId}")
    public List<AnalysisResponse> getHistory(
            @PathVariable Long userId
    ) {

        return analysisRepository
                .findByResumeUserId(userId)
                .stream()
                .map(AnalysisResponse::new)
                .toList();

    }

}