package com.resume.resumeanalyzer.controller;

import com.resume.resumeanalyzer.dto.ResumeResponse;
import com.resume.resumeanalyzer.entity.Resume;
import com.resume.resumeanalyzer.entity.User;
import com.resume.resumeanalyzer.repository.ResumeRepository;
import com.resume.resumeanalyzer.service.PdfService;
import com.resume.resumeanalyzer.service.ResumeService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final ResumeService resumeService;

    private final PdfService pdfService;

    private final ResumeRepository resumeRepository;


    public ResumeController(
            ResumeService resumeService,
            PdfService pdfService,
            ResumeRepository resumeRepository
    ) {

        this.resumeService = resumeService;
        this.pdfService = pdfService;
        this.resumeRepository = resumeRepository;

    }


    @PostMapping("/upload")
    public ResumeResponse uploadResume(

            @RequestParam("file") MultipartFile file,

            @RequestParam("userId") Long userId

    ) throws IOException {


        // Find the logged-in user by user ID

        User user = resumeService.findUserById(userId);


        if (user == null) {

            throw new RuntimeException("User not found");

        }


        String uploadDirectory =
                "C:/Users/Nithishkumar/Desktop/Ai Resume Analyser/uploads/";


        File directory = new File(uploadDirectory);


        if (!directory.exists()) {

            directory.mkdirs();

        }


        String filePath =
                uploadDirectory + file.getOriginalFilename();


        file.transferTo(
                new File(filePath)
        );


        String extractedText =
                pdfService.extractText(filePath);


        Resume resume = new Resume();


        resume.setFileName(
                file.getOriginalFilename()
        );


        resume.setFilePath(
                filePath
        );


        resume.setExtractedText(
                extractedText
        );


        resume.setUploadedDate(
                LocalDateTime.now()
        );


        resume.setUser(user);


        Resume savedResume =
                resumeService.saveResume(resume);


        return new ResumeResponse(savedResume);

    }


    // Get latest uploaded resume

    @GetMapping("/latest/{userId}")
    public ResumeResponse getLatestResume(

            @PathVariable Long userId

    ) {

        Resume resume =
                resumeRepository
                        .findTopByUserIdOrderByUploadedDateDesc(userId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "No resume found"
                                )
                        );


        return new ResumeResponse(resume);

    }


    // Get all resumes of user

    @GetMapping("/user/{userId}")
    public List<ResumeResponse> getUserResumes(

            @PathVariable Long userId

    ) {

        return resumeService
                .getResumesByUserId(userId)
                .stream()
                .map(ResumeResponse::new)
                .toList();

    }


    // Delete resume

    @DeleteMapping("/{resumeId}")
    public String deleteResume(

            @PathVariable Long resumeId

    ) {

        resumeService.deleteResume(resumeId);

        return "Resume deleted successfully";

    }

}