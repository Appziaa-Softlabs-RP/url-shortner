<?php

namespace App\Repositories;

use App\Models\ApiClient;
use App\Models\User;

class ApiClientRepository
{
    protected ApiClient $model;

    public function __construct(ApiClient $model)
    {
        $this->model = $model;
    }

    public function findByToken(string $token)
    {
        return $this->model->where('token', $token)->first();
    }

    public function getAllByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function create(array $data): ApiClient
    {
        return $this->model->create($data);
    }

    public function existsByAppUrl(string $appUrl, int $userId): bool
    {
        return $this->model->where('app_url', $appUrl)
            ->where('user_id', $userId)
            ->exists();
    }

    public function validateToken(string $token, string $url): bool
    {
        return $this->model->where('token', $token)
            ->where('app_url', $url)
            ->where('is_active', true)
            ->exists();
    }

    public function getUserByToken(string $token): User
    {
        $apiClient = $this->model->where('token', $token)
            ->first();

        return $apiClient->user;
    }

    public function index()
    {
        return $this->model->get();
    }

    public function show($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        return $this->model->find($id)->delete();
    }

    public function update($id, $data)
    {
        $model = $this->model->find($id);
        $model->fill($data);
        $model->save();

        return $model;
    }
}
