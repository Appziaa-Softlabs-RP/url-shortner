<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Services\BlogService;
use App\Services\CategoryService;

class BlogController extends Controller
{
    use HttpResponse;

    protected BlogService $blogService;

    protected CategoryService $categoryService;

    public function __construct(
        BlogService $blogService,
        CategoryService $categoryService
    ) {
        $this->blogService = $blogService;
        $this->categoryService = $categoryService;
    }

    public function overview()
    {
        try {
            $data = $this->blogService->getUserBlogsOverview(request()->category);

            return $this->success(
                data: $data,
                message: 'Blogs fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->internalError(
                message: $e->getMessage(),
            );
        }
    }

    public function show()
    {
        try {
            $blog = $this->blogService->getBlogBySlug(request()->slug);

            $categories = $this->categoryService->getActiveCategories();

            return $this->success(
                data: [
                    'blog' => $blog,
                    'categories' => $categories,
                ],
                message: 'Blog fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->internalError(
                message: $e->getMessage(),
            );
        }
    }
}
