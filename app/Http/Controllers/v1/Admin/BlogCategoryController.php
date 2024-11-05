<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Admin\BlogCategory\AddCategoryRequest;
use App\Http\Requests\v1\Admin\BlogCategory\UpdateCategoryRequest;
use App\Http\Traits\HttpResponse;
use App\Services\BlogCategoryService;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{

    use HttpResponse;

    protected BlogCategoryService $blogCategoryService;

    public function __construct(BlogCategoryService $blogCategoryService)
    {
        $this->blogCategoryService = $blogCategoryService;
    }

    public function index()
    {
        $categories = $this->blogCategoryService->index(request());

        return $this->success(
            message: 'List of blog categories',
            data: $categories
        );
    }

    public function store(AddCategoryRequest $request)
    {
        $category = $this->blogCategoryService->store($request);

        return $this->success(
            message: 'Blog category created successfully',
            data: $category
        );
    }

    public function show($id)
    {
        $category = $this->blogCategoryService->show($id);

        return $this->success(
            message: 'Blog category details',
            data: $category
        );
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $isSlugExists = $this->blogCategoryService->isSlugExists($request->slug, $id);

        if ($isSlugExists) {
            return $this->error(
                message: 'URL already exists',
                code: 400
            );
        }


        $category = $this->blogCategoryService->update($request, $id);

        return $this->success(
            message: 'Blog category updated successfully',
            data: $category
        );
    }

    public function destroy($id)
    {
        $category = $this->blogCategoryService->destroy($id);

        return $this->success(
            message: 'Blog category deleted successfully',
            data: $category
        );
    }
}
