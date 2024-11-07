<?php

namespace App\Services;

use App\Repositories\LegalPolicyRepository;

class LegalPolicyService
{
    protected LegalPolicyRepository $repository;

    protected ImageUploadService $imageService;

    public function __construct(
        LegalPolicyRepository $repository,
        ImageUploadService $imageService
    ) {
        $this->repository = $repository;
        $this->imageService = $imageService;
    }

    protected function uploadFile($image)
    {
        if ($image) {
            return $this->imageService->uploadImage($image, '/policies/files');
        }

        return null;
    }

    public function index()
    {
        return $this->repository->index();
    }

    public function show($id)
    {
        return $this->repository->show($id);
    }

    public function store($data, $file)
    {
        // if request has image then upload it
        if ($file) {
            $data['file'] = $this->uploadFile($file);
        } else {
            unset($data['file']);
        }

        return $this->repository->store($data);
    }

    public function update($id, $data, $file)
    {
        // delete old file
        if ($file) {
            $this->imageService->deleteFileFromUrl($file, '/policies/files/');
            // update with new file
            $data['file'] = $this->uploadFile($file);
        } else {
            unset($data['file']);
        }

        return $this->repository->update($id, $data);
    }

    public function destroy($id)
    {
        // deleting image
        $policyLaw = $this->repository->show($id);
        if ($policyLaw->file) {
            $this->imageService->deleteFileFromUrl($policyLaw->file, '/policies/files/');
        }
        return $this->repository->destroy($id);
    }
}
