<?php

namespace App\Repositories;

use App\Models\Blog;

class BlogRepository
{
    protected Blog $model;

    protected BlogCategoryRepository $blogCategoryRepository;

    protected CategoryRepository $category;

    public function __construct(
        Blog $model,
        BlogCategoryRepository $blogCategoryRepository,
        CategoryRepository $categoryRepository
    ) {
        $this->model = $model;
        $this->blogCategoryRepository = $blogCategoryRepository;
        $this->category = $categoryRepository;
    }

    public function getBlogBySlug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function getActive()
    {
        return $this->model->active()->get();
    }

    public function getMostReadArticles()
    {
        return $this->model->orderBy('views', 'desc')
            ->active()
            ->limit(request()->limit ?? 10)->get();
    }

    public function latestArticles()
    {
        return $this->model->latest()->limit(request()->limit ?? 10)->get();
    }

    public function getBlogByCategory($id = null)
    {
        if ($id) {
            return $this->category->blogsByCategoryId($id);
        } else {
            return $this->model->latest()->get();
        }
    }

    public function isSlugExists($slug, $id)
    {
        return $this->model->where('slug', $slug)->where('id', '!=', $id)->exists();
    }

    public function index($request)
    {
        return $this->model
            ->where('title', 'like', '%'.$request->search.'%')
            ->paginate($request->per_page);
    }

    public function store($data)
    {
        return $this->model->create($data);
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update($data, $id)
    {
        $blog = $this->model->findOrFail($id);
        $blog->update($data);

        return $blog;
    }

    public function destroy($id)
    {
        $blog = $this->model->findOrFail($id);
        $blog->delete();

        return $blog;
    }
}
