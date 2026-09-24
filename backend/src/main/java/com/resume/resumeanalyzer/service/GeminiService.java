package com.resume.resumeanalyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class GeminiService {


    @Value("${gemini.api.key}")
    private String apiKey;


    private final ObjectMapper objectMapper =
            new ObjectMapper();





    public String analyzeResume(String resumeText) {


        try {


            // Reduce token usage

            if(resumeText.length() > 4000){

                resumeText =
                        resumeText.substring(0,4000);

            }





            String prompt = """

                    Analyze the resume below.

                    Return ONLY valid JSON.

                    No markdown.
                    No explanation.


                    JSON format:

                    {
                      "atsScore":0,
                      "strengths":[],
                      "weaknesses":[],
                      "missingSkills":[],
                      "suggestions":[],
                      "suitableJobRoles":[],
                      "interviewQuestions":[]
                    }


                    Resume:

                    """ + resumeText;







            Client client =
                    Client.builder()
                    .apiKey(apiKey)
                    .build();







            GenerateContentResponse response = null;


            int attempts = 3;







            while(attempts > 0){


                try {


                    response =
                            client.models.generateContent(

                                    "gemini-3.5-flash",

                                    prompt,

                                    null

                            );


                    break;


                }
                catch(Exception e){


                    attempts--;


                    if(attempts == 0){

                        throw e;

                    }


                    // Wait before retry

                    Thread.sleep(5000);


                }


            }







            if(response == null){


                throw new RuntimeException(
                        "No response received from Gemini"
                );


            }







            String result =
                    response.text();








            if(result == null || result.isBlank()){


                throw new RuntimeException(
                        "Gemini returned empty response"
                );


            }








            // Remove markdown if Gemini adds it

            result =
                    result
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();








            // Extract JSON only

            int start =
                    result.indexOf("{");


            int end =
                    result.lastIndexOf("}");






            if(start != -1 && end != -1){


                result =
                        result.substring(
                                start,
                                end + 1
                        );


            }








            // Validate JSON

            objectMapper.readTree(result);






            return result;







        }
        catch(Exception e){


            throw new RuntimeException(

                    "Gemini SDK Error : "
                    + e.getMessage()

            );


        }


    }


}