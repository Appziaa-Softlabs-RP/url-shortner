<?php

namespace App\Repositories;

use App\Models\BlogCategory;

class BlogCategoryRepository
{
    protected BlogCategory $blogCategory;

    public function __construct(BlogCategory $blogCategory)
    {
        $this->blogCategory = $blogCategory;
    }

    public function store($blogId, $categoryId)
    {
        return $this->blogCategory->create([
            'blog_id' => $blogId,
            'category_id' => $categoryId,
        ]);
    }

    public function deleteBlogCategories($blogId)
    {
        return $this->blogCategory->where('blog_id', $blogId)->delete();
    }
}
