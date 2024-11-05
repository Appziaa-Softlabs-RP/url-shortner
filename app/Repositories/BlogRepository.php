<?php

namespace App\Repositories;

use App\Models\Blog;

class BlogRepository
{
    protected Blog $model;

    public function __construct(Blog $model)
    {
        $this->model = $model;
    }

    public function getActive()
    {
        return $this->model->active()->get();
    }

    public function isSlugExists($slug, $id)
    {
        return $this->model->where('slug', $slug)->where('id', '!=', $id)->exists();
    }

    public function index($request)
    {
        return $this->model
            ->where('title', 'like', '%' . $request->search . '%')
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
