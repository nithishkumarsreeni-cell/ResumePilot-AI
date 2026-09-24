package com.resume.resumeanalyzer.dto;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.resumeanalyzer.entity.Analysis;

import java.util.ArrayList;
import java.util.List;

public class AnalysisResponse {

    private Long id;
    private int atsScore;
    private Long resumeId;

    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> missingSkills;
    private List<String> suggestions;
    private List<String> suitableJobRoles;
    private List<String> interviewQuestions;

    public AnalysisResponse(Analysis analysis) {

        this.id = analysis.getId();
        this.atsScore = analysis.getAtsScore();
        this.resumeId = analysis.getResume().getId();

        ObjectMapper mapper = new ObjectMapper();

        try {

            JsonNode json = mapper.readTree(analysis.getSkillsFound());

            strengths = mapper.convertValue(
                    json.path("strengths"),
                    new TypeReference<List<String>>() {}
            );

            weaknesses = mapper.convertValue(
                    json.path("weaknesses"),
                    new TypeReference<List<String>>() {}
            );

            missingSkills = mapper.convertValue(
                    json.path("missingSkills"),
                    new TypeReference<List<String>>() {}
            );

            suggestions = mapper.convertValue(
                    json.path("suggestions"),
                    new TypeReference<List<String>>() {}
            );

            suitableJobRoles = mapper.convertValue(
                    json.path("suitableJobRoles"),
                    new TypeReference<List<String>>() {}
            );

            interviewQuestions = mapper.convertValue(
                    json.path("interviewQuestions"),
                    new TypeReference<List<String>>() {}
            );

        } catch (Exception e) {

            strengths = new ArrayList<>();
            weaknesses = new ArrayList<>();
            missingSkills = new ArrayList<>();
            suggestions = new ArrayList<>();
            suitableJobRoles = new ArrayList<>();
            interviewQuestions = new ArrayList<>();
        }
    }

    public Long getId() {
        return id;
    }

    public int getAtsScore() {
        return atsScore;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public List<String> getSuitableJobRoles() {
        return suitableJobRoles;
    }

    public List<String> getInterviewQuestions() {
        return interviewQuestions;
    }
}