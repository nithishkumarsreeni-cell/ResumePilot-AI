package com.resume.resumeanalyzer.dto;

import com.resume.resumeanalyzer.entity.Resume;

import java.time.LocalDateTime;

public class ResumeResponse {

    private Long id;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedDate;
    private String extractedText;

    private Long userId;
    private String userName;
    private String userEmail;


    public ResumeResponse(Resume resume) {

        this.id = resume.getId();
        this.fileName = resume.getFileName();
        this.filePath = resume.getFilePath();
        this.uploadedDate = resume.getUploadedDate();
        this.extractedText = resume.getExtractedText();

        this.userId = resume.getUser().getId();
        this.userName = resume.getUser().getName();
        this.userEmail = resume.getUser().getEmail();
    }


    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public LocalDateTime getUploadedDate() {
        return uploadedDate;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }
}
