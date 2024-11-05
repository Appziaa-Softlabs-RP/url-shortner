<?php

namespace App\Http\Controllers\v1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Admin\Blog\AddBlogRequest;
use App\Http\Requests\v1\Admin\Blog\UpdateBlogRequest;
use App\Http\Traits\HttpResponse;
use App\Services\BlogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{

    use HttpResponse;

    protected BlogService $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function index()
    {
        $blogs = $this->blogService->index(request());

        return $this->success(
            message: 'Blogs fetched successfully',
            data: $blogs
        );
    }

    public function store(AddBlogRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $image = $request->file('image');

            $blog = $this->blogService->store($validated, $image);

            DB::commit();
            return $this->success(
                message: 'Blog created successfully',
                data: $blog
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error(
                message: 'Something went wrong',
                code: 500
            );
        }
    }

    public function show($id)
    {
        $blog = $this->blogService->show($id);

        return $this->success(
            message: 'Blog fetched successfully',
            data: $blog
        );
    }

    public function update(UpdateBlogRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $isSlugExists = $this->blogService->isSlugExists($request->slug, $id);

            if ($isSlugExists) {
                return $this->error(
                    message: 'URL already exists',
                    code: 400
                );
            }

            $validated = $request->validated();

            $image = $request->file('image');

            $blog = $this->blogService->update($validated, $image, $id);

            DB::commit();
            return $this->success(
                message: 'Blog updated successfully',
                data: $blog
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error(
                message: 'Something went wrong',
                code: 500
            );
        }
    }

    public function destroy($id)
    {
        $blog = $this->blogService->destroy($id);

        return $this->success(
            message: 'Blog deleted successfully',
            data: $blog
        );
    }
}
