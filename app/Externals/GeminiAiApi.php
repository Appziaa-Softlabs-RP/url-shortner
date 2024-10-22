<?php

namespace App\Externals;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;

class GeminiAiApi
{


    protected function filterGeminiResponse($data, $isText=false)
    {
        if (isset($data->candidates) && count($data->candidates) > 0) {
            $result = $data->candidates[0];

            if (isset($result->content->parts) && count($result->content->parts) > 0) {
                $text = $result->content->parts[0]->text;

                // Clean the text: remove markdown symbols (** or ##) and trim extra spaces
                $cleanedText = trim($text);
                $cleanedText = preg_replace('/(\*\*|##|```json|```)/', '', $cleanedText);

                // Decode the cleaned JSON text
                if($isText) {
                    return $cleanedText;
                }
                $parsedText = json_decode($cleanedText);

                if (json_last_error() === JSON_ERROR_NONE) {
                    return $parsedText;
                } else {
                    Log::error('JSON decode error: ' . json_last_error_msg());
                }
            }
        }

        return null;
    }



    protected function filterGeminiResponseJobDescription($data)
    {
        if (isset($data->candidates) && count($data->candidates) > 0) {
            $result = $data->candidates[0];

            if (isset($result->content->parts) && count($result->content->parts) > 0) {
                $text = $result->content->parts[0]->text;

                // Log the raw input data for debugging
                Log::info('Raw input data: ' . print_r($text, true));

                // Clean the text
                $cleanedText = trim($text);
                $cleanedText = preg_replace('/```json|```/', '', $cleanedText);
                // Remove control characters and unwanted characters
                $cleanedText = preg_replace('/[\x00-\x1F\x7F]/', '', $cleanedText); // Keep only printable characters
                $cleanedText = preg_replace('/[^\x20-\x7E\n]+/', '', $cleanedText); // Keep only printable characters and newlines

                // Log the cleaned JSON response for debugging
                Log::info('Cleaned JSON response: ' . $cleanedText);

                // Check for UTF-8 encoding
                if (!mb_check_encoding($cleanedText, 'UTF-8')) {
                    $cleanedText = mb_convert_encoding($cleanedText, 'UTF-8');
                }

                // Encode any JSON-specific characters
                $cleanedText = json_encode(json_decode($cleanedText));

                // Decode the cleaned JSON text
                $parsedText = json_decode($cleanedText);

                if (json_last_error() === JSON_ERROR_NONE) {
                    return $parsedText;
                } else {
                    Log::error('JSON decode error: ' . json_last_error_msg() . ' | Cleaned Text: ' . $cleanedText);
                }
            }
        }

        return null;
    }

    public function generateBooleanString($jobDescription)
    {
        $query = "Extract the following data from the job description: Job Titles (key: job_titles), Keywords (key: keywords), Company Names (key: companies), Industries (key: industries), Other Related Keywords (key: other_related_keywords). Give result in JSON format. Job Description: '" . $jobDescription . "'";

        $response = Gemini::geminiPro()->generateContent($query);

        $result = $this->filterGeminiResponse(
            data: $response
        );

        // Return the response in JSON format
        return $result;
    }

    public function generatePrescreeningInterviewQuestions(string $description)
    {
        $prompt = "User description: '" . $description . "'
            Generate 10 technical interview questions (key: technical_interview_questions).
            Generate 10 behavioral interview questions (key: behavioral_interview_questions).
            Give Result in JSON format.";

        $response = Gemini::geminiPro()->generateContent($prompt);

        $result = $this->filterGeminiResponse(
            data: $response
        );

        return $result;
    }

    public function generatePrescreeningModalAnswer(string $question)
    {
        $prompt = `Interview Question: '` . $question . `'
        Please provide a concise paragraph response suitable for a job interview setting. Give result in JSON format in the following structure:
        {
            "question": "` . $question . `",
            "data": "Your concise answer here in md format"
        }`;

        $response = Gemini::geminiPro()->generateContent($prompt);
        Log::info(json_encode($response));

        $result = $this->filterGeminiResponse(
            data: $response,
            isText: true
        );

        return $result;
    }

    public function generateJobDescription(string $jobTitle, string $industry = '', string $tone)
    {
        $prompt = "
        Generate a detailed job description based on the following details:
        - **Job Title:** " . $jobTitle . "
        - **Industry:** " . $industry . "
        - **Tone:** " . $tone . "

        Note: Points Must be in numbered list format.

        Create a comprehensive and well-structured job description that includes the following sections:
        1. **Job Summary**: Provide a brief overview of the role, including the primary objectives and key responsibilities.
        2. **Key Responsibilities**: List the main tasks and duties associated with the position.
        3. **Minimum Qualifications**: Outline the essential skills, experience, and educational requirements for candidates.
        4. **Preferred Qualifications**: Include any additional qualifications or experiences that are desirable but not essential.
        5. **Benefits**: Describe the benefits and perks offered to employees in this role.
        6. **Application Instructions**: Provide clear instructions on how to apply for the position.

        Ensure the job description is tailored to the job title and industry specified, and aligns with the given tone (e.g., formal, casual). The description should be professional and engaging.

        Your response should be formatted as a JSON object in the following structure:
            {
                'description': 'Provide a clear, concise, and professionally written job description here.'
            }

        Format the 'description' field using markdown where appropriate (e.g., lists, bold for section headers).
        Give in Proper JSON format.
        ";

        // Call to Gemini for generating content
        $response = Gemini::geminiPro()->generateContent($prompt);

        // Filter and parse the response
        $result = $this->filterGeminiResponseJobDescription($response);

        return $result;
    }
}
