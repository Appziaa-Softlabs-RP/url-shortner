<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Google\Auth\ApplicationDefaultCredentials;
use Google\Auth\OAuth2;
use Google\Auth\HttpHandler\HttpHandlerFactory;
use Google\Auth\Credentials\ServiceAccountCredentials;

class VertexService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('GEMINI_API_KEY');
    }

    // Format the response and ensure all keys are defined before accessing them
    function formatResponse($results)
    {
        $message = '';

        foreach ($results as $result) {
            if (isset($result['candidates']) && is_array($result['candidates']) && isset($result['candidates'][0])) {
                $candidate = $result['candidates'][0];

                if (isset($candidate['content']) && isset($candidate['content']['parts']) && isset($candidate['content']['parts'][0])) {
                    $part = $candidate['content']['parts'][0];

                    if (isset($part['text'])) {
                        $message .= $part['text'];
                    }
                }
            }
        }

        return $message;
    }

    public function comparePdfs($description, $pdfs)
    {
        $partsData = [];

        // Limit to a maximum of 5 PDFs
        $pdfs = array_slice($pdfs, 0, 5);

        foreach ($pdfs as $pdf) {
            // Get the content of the PDF file
            $pdfContent = file_get_contents($pdf->getRealPath());

            if ($pdfContent === false) {
                throw new Exception("Error reading PDF file: " . $pdf->getRealPath());
            }

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

        // Ensure we handle cases where results might be empty or invalid
        if (!$results || !is_array($results)) {
            throw new Exception("Invalid response received from the API");
        }

        // Return the formatted response
        return $this->formatResponse($results);
    }

    public function calculateCandidateFitScore($description, $pdfs)
    {
        $partsData = [];

        // Limit to a maximum of 5 PDFs
        $pdfs = array_slice($pdfs, 0, 5);

        foreach ($pdfs as $pdf) {
            // Get the content of the PDF file
            $pdfContent = file_get_contents($pdf->getRealPath());

            if ($pdfContent === false) {
                throw new Exception("Error reading PDF file: " . $pdf->getRealPath());
            }

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

        // Construct the body JSON for candidate fit scoring
        $bodyJson = [
            "contents" => [
                [
                    "role" => "user",
                    "parts" => array_merge($partsData, [
                        [
                            "text" => $description
                        ],
                        [
                            "text" => "Objective: Assess the fit of each candidate for the position based on the provided CVs and the following criteria."
                        ],
                        [
                            "text" => "1. Skills Match: Evaluate the specific skills mentioned in the CVs against the job requirements."
                        ],
                        [
                            "text" => "2. Relevant Experience: Compare the work experience of each candidate, focusing on the relevance to the role."
                        ],
                        [
                            "text" => "3. Educational Background: Assess the academic qualifications related to the job."
                        ],
                        [
                            "text" => "4. Certifications and Achievements: Highlight relevant certifications, awards, or notable achievements."
                        ],
                        [
                            "text" => "5. Cultural Fit and Soft Skills: Identify indicators of cultural fit, leadership qualities, and interpersonal skills."
                        ],
                        [
                            "text" => "Please provide the results for each candidate in the following format:
                            [
                                {
                                    \"candidate_name\": \"___\",
                                    \"skills_match\": 0-100,
                                    \"relevant_experience\": 0-100,
                                    \"educational_background\": 0-100,
                                    \"certifications_and_achievements\": 0-100,
                                    \"cultural_fit_and_soft_skills\": 0-100,
                                    \"details\": {
                                        \"skills_match\": __,
                                        \"relevant_experience\": ___,
                                        \"educational_background\": ___,
                                        \"certifications_and_achievements\": ___,
                                        \"cultural_fit_and_soft_skills\": ___
                                    }
                                }
                            ]"
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
                "responseMimeType" => "application/json", // Expecting a JSON response
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

        // Ensure we handle cases where results might be empty or invalid
        if (!$results || !is_array($results)) {
            throw new Exception("Invalid response received from the API");
        }

        return $this->formatResponse($results);
    }

    private function getAccessToken()
    {
        // Load the service account key file using storage_path()
        $credentialsFile = storage_path('app/public/vertex-service.json');

        // Check if the file exists
        if (!file_exists($credentialsFile)) {
            throw new \Exception("Credentials file not found: " . $credentialsFile);
        }

        // Define the required scopes for your Google Cloud API
        $scopes = ['https://www.googleapis.com/auth/cloud-platform'];

        // Create the service account credentials object
        $credentials = new ServiceAccountCredentials($scopes, $credentialsFile);

        // Create the HTTP handler
        $httpHandler = HttpHandlerFactory::build();

        // Fetch the access token
        $accessToken = $credentials->fetchAuthToken($httpHandler)['access_token'];

        return $accessToken;
    }
}
