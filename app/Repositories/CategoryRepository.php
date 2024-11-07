<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    protected Category $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }

    public function isSlugExists($slug, $id)
    {
        return $this->model->where('slug', $slug)->where('id', '!=', $id)->exists();
    }

    public function getCategoriesArticles()
    {
        return $this->model->with('blogs')->get();
    }

    public function blogsByCategoryId($id)
    {
        return $this->model->findOrFail($id)->blogs;
    }

    public function getActive()
    {
        return $this->model->active()->get();
    }

    public function index($request)
    {
        return $this->model
            ->where('name', 'like', '%'.$request->search.'%')
            ->paginate($request->per_page);
    }

    public function store($request)
    {
        return $this->model->create($request->all());
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function getCategoryBySlug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function update($request, $id)
    {
        $blogCategory = $this->model->findOrFail($id);
        $blogCategory->update($request->all());

        return $blogCategory;
    }

    public function destroy($id)
    {
        $blogCategory = $this->model->findOrFail($id);
        $blogCategory->delete();

        return $blogCategory;
    }
}
