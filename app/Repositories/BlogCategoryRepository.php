<?php

namespace App\Repositories;

use App\Models\BlogCategory;

class BlogCategoryRepository
{

    protected BlogCategory $model;

    public function __construct(BlogCategory $model)
    {
        $this->model = $model;
    }

    public function isSlugExists($slug, $id)
    {
        return $this->model->where('slug', $slug)->where('id', '!=', $id)->exists();
    }

    public function getActive()
    {
        return $this->model->active()->get();
    }

    public function index($request)
    {
        return $this->model
            ->where('name', 'like', '%' . $request->search . '%')
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
