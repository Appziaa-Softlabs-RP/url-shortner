<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class VertexService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('GEMINI_API_KEY');
    }

    function formatResponse($results)
    {
        $message = '';
        foreach ($results as $result) {
            $text = $result['candidates'];
            $text = $text[0];
            $text = $text['content'];
            $text = $text['parts'];
            $text = $text[0];
            $text = $text['text'];

            $message .= $text;
        }

        return $message;
    }

    public function comparePdfs($description, $pdfs)
    {
        $partsData = [];

        // Limit to a maximum of 10 PDFs
        $pdfs = array_slice($pdfs, 0, 5);

        foreach ($pdfs as $pdf) {
            // Get the content of the PDF file
            $pdfContent = file_get_contents($pdf->getRealPath());
            // Convert to base64
            $base64Pdf = base64_encode($pdfContent);

            // Wrap the base64 string in the expected structure
            $partsData[] = [
                "inlineData" => [
                    "mimeType" => "application/pdf",
                    "data" => $base64Pdf
                ]
            ];
        }

        // Construct the body JSON
        $bodyJson = [
            "contents" => [
                [
                    "role" => "user",
                    "parts" => array_merge($partsData, [
                        [
                            "text" => $description
                        ],
                        [
                            "text" => "Objective: Provide a comparative analysis of candidate CVs to identify the best fit for the position based on skills, experience, and qualifications. Rank the candidates in order of suitability."
                        ],
                        [
                            "text" => "Skills Match: Evaluate the specific skills mentioned in the CVs against the job requirements."
                        ],
                        [
                            "text" => "Relevant Experience: Compare the work experience of each candidate, focusing on the relevance to the role."
                        ],
                        [
                            "text" => "Educational Background: Assess the academic qualifications related to the job."
                        ],
                        [
                            "text" => "Certifications and Achievements: Highlight relevant certifications, awards, or notable achievements."
                        ],
                        [
                            "text" => "Cultural Fit and Soft Skills: Identify indicators of cultural fit, leadership qualities, and interpersonal skills."
                        ]
                    ])
                ]
            ],
            "generationConfig" => [
                "temperature" => 1,
                "maxOutputTokens" => 8192,
                "topP" => 0.95,
                "topK" => 40,
                "candidateCount" => 1,
                "presencePenalty" => 0.0,
                "frequencyPenalty" => 0.0,
                "responseMimeType" => "text/plain",
            ],
            "safetySettings" => [
                [
                    "category" => "HARM_CATEGORY_HATE_SPEECH",
                    "threshold" => "BLOCK_MEDIUM_AND_ABOVE"
                ],
                [
                    "category" => "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold" => "BLOCK_MEDIUM_AND_ABOVE"
                ],
                [
                    "category" => "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold" => "BLOCK_MEDIUM_AND_ABOVE"
                ],
                [
                    "category" => "HARM_CATEGORY_HARASSMENT",
                    "threshold" => "BLOCK_MEDIUM_AND_ABOVE"
                ]
            ]
        ];

        // Convert to JSON
        $jsonBody = json_encode($bodyJson);

        $projectId = "inductive-voice-435808-i1";
        $location = "us-central1";
        $apiEndpoint = "us-central1-aiplatform.googleapis.com";
        $modelId = "gemini-1.5-flash-001";

        // Set up cURL
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "https://${apiEndpoint}/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:streamGenerateContent");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Authorization: Bearer " . $this->getAccessToken()
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);

        // Execute cURL request
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
            $errorMessage = curl_error($ch);
            curl_close($ch);
            throw new Exception("cURL error: $errorMessage");
        }

        curl_close($ch);

        $results = json_decode($response, true);

        // Return the response;
        return $this->formatResponse($results);
    }

    private function getAccessToken()
    {
        // Implement your logic to get the access token
        return trim(shell_exec("gcloud auth print-access-token"));
    }
}
