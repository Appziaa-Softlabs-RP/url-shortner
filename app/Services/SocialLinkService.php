<?php

namespace App\Services;

use App\Repositories\SocialLinkRepository;

class SocialLinkService
{
    protected SocialLinkRepository $SocialLinkRepository;
    protected ImageUploadService $imageService;

    public function __construct(
        SocialLinkRepository $SocialLinkRepository,
        ImageUploadService $imageService
    ) {
        $this->SocialLinkRepository = $SocialLinkRepository;
        $this->imageService = $imageService;
    }

    public function uploadImage($image)
    {
        if ($image) {
            return $this->imageService->uploadImage($image, '/images/socials');
        }

        return null;
    }

    public function index($request)
    {
        $socials = $this->SocialLinkRepository->index($request);
        foreach ($socials as $social) {
            $social->icon = url('storage/images/socials/' . $social->icon);
        }
        return $socials;
    }

    public function store(array $data, $icon)
    {
        // uploading icon
        $icon = $this->uploadImage($icon);
        $data['icon'] = $icon;
        return $this->SocialLinkRepository->store($data);
    }

    public function show($id)
    {
        $socials = $this->SocialLinkRepository->show($id);
        $socials->icon = url('storage/images/socials/' . $socials->icon);
        return $socials;
    }

    public function update(array $data, $icon, $id)
    {
        // if request has icon then upload it
        if ($icon) {
            // deleting old icon
            $social = $this->SocialLinkRepository->show($id);
            $this->imageService->deleteImage(
                image: $social->icon,
                path: '/images/socials/'
            );
            $data['icon'] = $this->uploadImage($icon);
        } else {
            // remove icon from request
            unset($data['icon']);
        }
        return $this->SocialLinkRepository->update($data, $id);
    }

    public function destroy($request, $id)
    {
        // getting social link
        $social = $this->SocialLinkRepository->show($id);
        // deleting icon
        $this->imageService->deleteImage(
            image: $social->icon,
            path: '/images/socials/'
        );
        return $this->SocialLinkRepository->destroy($request, $id);
    }
}
