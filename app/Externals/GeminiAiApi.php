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
        Please provide a concise paragraph response suitable for a job interview setting. Avoid using bullet points or lists (*), and focus on delivering a direct answer that highlights key points without elaboration. Return the answer in the following JSON format:
        {
            "question": "` . $question . `",
            "data": "Your concise answer here."
        }`;

        $response = Gemini::geminiPro()->generateContent($prompt);
        Log::info(json_encode($response));

        $result = $this->filterGeminiResponse(
            data: $response,
            isText: true
        );

        return $result;
    }

    public function generateJobDescription(string $jobTitle, $industry = '', string $tone)
    {
        $prompt = "
        Generate a detailed job description based on the following details:
        - **Job Title:** '" . $jobTitle . "'
        - **Industry:** '" . $industry . "'
        - **Tone:** '" . $tone . "'

        Note: Points Must be in number

        Create a comprehensive and well-structured job description that includes the following sections:
        1. **Job Summary**: Provide a brief overview of the role, including the primary objectives and key responsibilities.
        2. **Key Responsibilities**: List the main tasks and duties associated with the position.
        3. **Minimum Qualifications**: Outline the essential skills, experience, and educational requirements for candidates.
        4. **Preferred Qualifications**: Include any additional qualifications or experiences that are desirable but not essential.
        5. **Benefits**: Describe the benefits and perks offered to employees in this role.
        6. **Application Instructions**: Provide clear instructions on how to apply for the position.

        Ensure the job description is tailored to the job title and industry specified, and aligns with the given tone (e.g., formal, casual). The description should be professional, engaging, and free of special formatting, markdown, or symbols.

        Your response should be formatted as a JSON object in the following structure:
        {
            'jobTitle': '" . $jobTitle . "',
            'industry': '" . $industry . "',
            'tone': '" . $tone . "',
            'description': 'Provide a clear, concise, and professionally written job description here.'
        }

        Please ensure that the response is plain text and does not include any special formatting or symbols, just the raw text formatted as JSON as specified.
        ";

        $response = Gemini::geminiPro()->generateContent($prompt);
        Log::info(json_encode($response));

        $result = $this->filterGeminiResponse(
            data: $response
        );

        Log::info(json_encode($result));

        return $result;
    }
}
