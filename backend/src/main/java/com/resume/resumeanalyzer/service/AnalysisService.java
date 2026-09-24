package com.resume.resumeanalyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.resumeanalyzer.entity.Analysis;
import com.resume.resumeanalyzer.entity.Resume;
import com.resume.resumeanalyzer.repository.AnalysisRepository;

import org.springframework.stereotype.Service;


@Service
public class AnalysisService {


    private final AnalysisRepository analysisRepository;

    private final GeminiService geminiService;

    private final ObjectMapper objectMapper =
            new ObjectMapper();



    public AnalysisService(
            AnalysisRepository analysisRepository,
            GeminiService geminiService
    ) {


        this.analysisRepository = analysisRepository;

        this.geminiService = geminiService;


    }






    public Analysis analyzeResume(Resume resume) {


        try {


            String response;



            try {


                // Try real Gemini AI first

                response =
                        geminiService.analyzeResume(
                                resume.getExtractedText()
                        );


                System.out.println(
                        "Gemini AI analysis successful"
                );


            }
            catch(Exception e){


                System.out.println(
                        "Gemini failed. Using fallback analysis."
                );


                System.out.println(
                        "Gemini Error: "
                        + e.getMessage()
                );



                // Gemini failed → fallback

                response =
                        generateFallbackAnalysis(
                                resume.getExtractedText()
                        );


            }







            // Convert AI JSON response

            JsonNode json =
                    objectMapper.readTree(response);





            // Find existing analysis

            Analysis analysis =
                    analysisRepository
                            .findByResumeId(
                                    resume.getId()
                            )
                            .orElse(
                                    new Analysis()
                            );





            analysis.setAtsScore(
                    json.path("atsScore")
                            .asInt(0)
            );






            analysis.setMissingSkills(
                    objectMapper.writeValueAsString(
                            json.path("missingSkills")
                    )
            );






            analysis.setSuggestions(
                    objectMapper.writeValueAsString(
                            json.path("suggestions")
                    )
            );






            // Store complete analysis

            analysis.setSkillsFound(
                    objectMapper
                            .writerWithDefaultPrettyPrinter()
                            .writeValueAsString(json)
            );






            analysis.setResume(resume);





            return analysisRepository.save(
                    analysis
            );


        }
        catch(Exception e){


            throw new RuntimeException(
                    "Analysis failed: "
                            + e.getMessage()
            );


        }


    }






    private String generateFallbackAnalysis(
            String resumeText
    ) {


        String text =
                resumeText == null

                        ? ""

                        : resumeText.toLowerCase();



        boolean hasJava =
                text.contains("java");

        boolean hasPython =
                text.contains("python");

        boolean hasSql =
                text.contains("sql");

        boolean hasReact =
                text.contains("react");

        boolean hasSpring =
                text.contains("spring");

        boolean hasGit =
                text.contains("git");

        boolean hasAws =
                text.contains("aws");

        boolean hasDocker =
                text.contains("docker");





        int atsScore = 50;



        if(hasJava) atsScore += 8;

        if(hasPython) atsScore += 5;

        if(hasSql) atsScore += 7;

        if(hasReact) atsScore += 8;

        if(hasSpring) atsScore += 8;

        if(hasGit) atsScore += 4;

        if(hasAws) atsScore += 5;

        if(hasDocker) atsScore += 5;



        atsScore = Math.min(
                atsScore,
                95
        );






        String strengths =
                "[" +
                (hasJava
                        ? "\"Java programming experience\","
                        : "") +

                (hasPython
                        ? "\"Python programming knowledge\","
                        : "") +

                (hasSql
                        ? "\"Database and SQL knowledge\","
                        : "") +

                (hasReact
                        ? "\"Frontend development with React\","
                        : "") +

                (hasSpring
                        ? "\"Backend development with Spring Boot\","
                        : "") +

                (hasGit
                        ? "\"Version control using Git\","
                        : "") +

                "\"Resume successfully processed\"" +
                "]";



        String missingSkills =
                "[" +
                (!hasDocker
                        ? "\"Docker\","
                        : "") +

                (!hasAws
                        ? "\"AWS\","
                        : "") +

                "\"System Design\"" +
                "]";



        return """
                {
                  "atsScore": %d,

                  "strengths": %s,

                  "weaknesses": [
                    "Resume analysis generated using fallback mode",
                    "Add more measurable project achievements"
                  ],

                  "missingSkills": %s,

                  "suggestions": [
                    "Add measurable achievements to your projects",
                    "Improve your GitHub portfolio",
                    "Add relevant technical keywords",
                    "Include certifications and practical projects"
                  ],

                  "suitableJobRoles": [
                    "Software Developer",
                    "Full Stack Developer",
                    "Junior Backend Developer"
                  ],

                  "interviewQuestions": [
                    "Explain one of your technical projects",
                    "What technologies have you used and why?",
                    "Describe a challenging problem you solved",
                    "How do you design and test an application?"
                  ]
                }
                """.formatted(
                        atsScore,
                        strengths,
                        missingSkills
                );


    }


}