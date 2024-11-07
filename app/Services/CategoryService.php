<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService
{
    protected CategoryRepository $blogCategoryRepository;

    public function __construct(
        CategoryRepository $blogCategoryRepository
    ) {
        $this->blogCategoryRepository = $blogCategoryRepository;
    }

    public function getCategoryBySlug($slug)
    {
        return $this->blogCategoryRepository->getCategoryBySlug($slug);
    }

    public function isCategoryExists($id)
    {
        return $this->blogCategoryRepository->show($id);
    }

    public function getCategoriesArticles()
    {
        return $this->blogCategoryRepository->getCategoriesArticles();
    }

    public function getActiveCategories()
    {
        return $this->blogCategoryRepository->getActive();
    }

    public function isSlugExists($slug, $id)
    {
        return $this->blogCategoryRepository->isSlugExists($slug, $id);
    }

    public function index($request)
    {
        return $this->blogCategoryRepository->index($request);
    }

    public function store($request)
    {
        return $this->blogCategoryRepository->store($request);
    }

    public function show($id)
    {
        return $this->blogCategoryRepository->show($id);
    }

    public function update($request, $id)
    {
        return $this->blogCategoryRepository->update($request, $id);
    }

    public function destroy($id)
    {
        return $this->blogCategoryRepository->destroy($id);
    }
}
