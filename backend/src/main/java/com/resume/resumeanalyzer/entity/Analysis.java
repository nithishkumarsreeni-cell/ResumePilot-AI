package com.resume.resumeanalyzer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "analyses")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int atsScore;

    @Column(columnDefinition = "LONGTEXT")
    private String skillsFound;

    @Column(columnDefinition = "LONGTEXT")
    private String missingSkills;

    @Column(columnDefinition = "LONGTEXT")
    private String suggestions;


    @OneToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;


    public Analysis() {
    }


    public Long getId() {
        return id;
    }

    public int getAtsScore() {
        return atsScore;
    }

    public String getSkillsFound() {
        return skillsFound;
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public Resume getResume() {
        return resume;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public void setSkillsFound(String skillsFound) {
        this.skillsFound = skillsFound;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }
}
