<?php

namespace App\Services;

use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;

class BlogService
{
    protected BlogRepository $blogRepository;

    protected BlogCategoryRepository $blogCategoryRepository;

    protected CategoryService $categoryService;

    protected ImageUploadService $imageService;

    public function __construct(
        BlogRepository $blogRepository,
        ImageUploadService $imageService,
        BlogCategoryRepository $blogCategoryRepository,
        CategoryService $categoryService
    ) {
        $this->blogRepository = $blogRepository;
        $this->imageService = $imageService;
        $this->blogCategoryRepository = $blogCategoryRepository;
        $this->categoryService = $categoryService;
    }

    public function getBlogBySlug($slug)
    {
        $blog = $this->blogRepository->getBlogBySlug($slug);

        return $blog;
    }

    public function getUserBlogsOverview($categorySlug = null): array
    {
        $catId = null;
        $heading = 'Latest Articles';
        // validating id
        if ($categorySlug) {
            $category = $this->categoryService->getCategoryBySlug($categorySlug);
            if ($category) {
                $catId = $category->id;
                $heading = $category->name;
            }
        }

        if ($catId) {
            return [
                'heading' => $heading,
                'categories' => $this->categoryService->getActiveCategories(),
                'blogs' => $this->blogRepository->getBlogByCategory($catId),
                'most_read_articles' => $this->blogRepository->getMostReadArticles(),
            ];
        }

        return [
            'heading' => $heading,
            'categories' => $this->categoryService->getActiveCategories(),
            'blogs' => $this->blogRepository->getBlogByCategory($catId),
            'category_articles' => $this->categoryService->getCategoriesArticles(),
            'most_read_articles' => $this->blogRepository->getMostReadArticles(),
        ];
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

        return $blogs;
    }

    public function index($request)
    {
        $blogs = $this->blogRepository->index($request);

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

        $data['created_by'] = auth()->id();

        $blog = $this->blogRepository->store($data);

        // storing categories
        foreach ($data['category_ids'] as $categoryId) {
            $this->blogCategoryRepository->store($blog->id, $categoryId);
        }

        return $blog;
    }

    public function show($id)
    {
        $blog = $this->blogRepository->show($id);

        return $blog;
    }

    public function update($data, $image, $id)
    {
        // if request has image then upload it
        if ($image) {
            // deleting old image
            $social = $this->blogRepository->show($id);
            $this->imageService->deleteFileFromUrl(
                imageUrl: $social->image,
                path: '/blogs/images/'
            );
            $data['image'] = $this->uploadImage($image);
        } else {
            // remove image from request
            unset($data['image']);
        }

        $blog = $this->blogRepository->update($data, $id);

        // deleting old categories
        $this->blogCategoryRepository->deleteBlogCategories($id);

        // storing categories
        foreach ($data['category_ids'] as $categoryId) {
            $this->blogCategoryRepository->store($blog->id, $categoryId);
        }

        return $blog;
    }

    public function destroy($id)
    {
        // getting social link
        $social = $this->blogRepository->show($id);
        // deleting icon
        $this->imageService->deleteFileFromUrl(
            imageUrl: $social->icon,
            path: '/blogs/images/'
        );

        return $this->blogRepository->destroy($id);
    }
}
