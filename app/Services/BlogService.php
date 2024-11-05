<?php

namespace App\Services;

use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;

class BlogService
{

    protected BlogRepository $blogRepository;
    protected ImageUploadService $imageService;

    public function __construct(
        BlogRepository $blogRepository,
        ImageUploadService $imageService
    ) {
        $this->blogRepository = $blogRepository;
        $this->imageService = $imageService;
    }

    public function isSlugExists($slug, $id)
    {
        return $this->blogRepository->isSlugExists($slug, $id);
    }

    public function uploadImage($image)
    {
        if ($image) {
            return $this->imageService->uploadImage($image, '/blogs/images');
        }

        return null;
    }

    public function getActiveBlogs()
    {
        $blogs = $this->blogRepository->getActive();
        foreach ($blogs as $blog) {
            $blog->image = url('storage/blogs/images/' . $blog->image);
        }

        return $blogs;
    }

    public function index($request)
    {
        $blogs = $this->blogRepository->index($request);
        foreach ($blogs as $blog) {
            $blog->image = url('storage/blogs/images/' . $blog->image);
        }
        return $blogs;
    }

    public function store(array $data, $image)
    {
        // if request has image then upload it
        if ($image) {
            $data['image'] = $this->uploadImage($image);
        } else {
            unset($data['image']);
        }
        return $this->blogRepository->store($data);
    }

    public function show($id)
    {
        $blog = $this->blogRepository->show($id);
        $blog->image = url('storage/blogs/images/' . $blog->image);
        return $blog;
    }

    public function update($data, $image, $id)
    {
        // if request has image then upload it
        if ($image) {
            // deleting old image
            $social = $this->blogRepository->show($id);
            $this->imageService->deleteImage(
                image: $social->image,
                path: '/blogs/images/'
            );
            $data['image'] = $this->uploadImage($image);
        } else {
            // remove image from request
            unset($data['image']);
        }
        return $this->blogRepository->update($data, $id);
    }

    public function destroy($id)
    {
        // getting social link
        $social = $this->blogRepository->show($id);
        // deleting icon
        $this->imageService->deleteImage(
            image: $social->icon,
            path: '/blogs/images/'
        );

        return $this->blogRepository->destroy($id);
    }

}
