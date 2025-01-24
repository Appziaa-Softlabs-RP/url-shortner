<?php

namespace App\Services;

use App\Repositories\ApiClientRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ApiClientService
{
    protected ApiClientRepository $apiClientRepository;

    public function __construct(ApiClientRepository $apiClientRepository)
    {
        $this->apiClientRepository = $apiClientRepository;
    }

    public function registerApp(array $data)
    {
        // Check if app_url is already registered for the current user
        $userId = Auth::id();
        if ($this->apiClientRepository->existsByAppUrl($data['app_url'], $userId)) {
            throw new Exception('This app URL is already registered.');
        }

        // Create a new API client
        $apiClient = $this->apiClientRepository->create([
            'user_id' => $userId,
            'name' => $data['name'],
            'description' => $data['description'],
            'app_url' => $data['app_url'],
            'token' => Str::random(60),
        ]);

        return $apiClient;
    }

    public function validateToken(string $token, string $url): bool
    {
        return $this->apiClientRepository->validateToken($token, $url);
    }

    public function index()
    {
        return $this->apiClientRepository->index();
    }

    public function show($id)
    {
        return $this->apiClientRepository->show($id);
    }

    public function destroy($id)
    {
        return $this->apiClientRepository->destroy($id);
    }

    public function update($id, $data)
    {
        return $this->apiClientRepository->update($id, $data);
    }
}
