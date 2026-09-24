package com.resume.resumeanalyzer.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "resumes")
public class Resume {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String fileName;


    private String filePath;


    private LocalDateTime uploadedDate;



    @Column(columnDefinition = "LONGTEXT")
    private String extractedText;




    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;





    @OneToMany(
            mappedBy = "resume",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Analysis> analyses;







    public Resume() {

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


    public User getUser() {

        return user;

    }


    public List<Analysis> getAnalyses() {

        return analyses;

    }







    public void setId(Long id) {

        this.id = id;

    }


    public void setFileName(String fileName) {

        this.fileName = fileName;

    }


    public void setFilePath(String filePath) {

        this.filePath = filePath;

    }


    public void setUploadedDate(LocalDateTime uploadedDate) {

        this.uploadedDate = uploadedDate;

    }


    public void setExtractedText(String extractedText) {

        this.extractedText = extractedText;

    }


    public void setUser(User user) {

        this.user = user;

    }


    public void setAnalyses(List<Analysis> analyses) {

        this.analyses = analyses;

    }

}