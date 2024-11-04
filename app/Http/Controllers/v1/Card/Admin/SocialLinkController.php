<?php

namespace App\Http\Controllers\v1\Card\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Admin\AddSocialLinkRequest;
use App\Http\Requests\v1\Admin\UpdateSocialLinkRequest;
use App\Http\Traits\HttpResponse;
use App\Services\SocialLinkService;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    use HttpResponse;

    protected SocialLinkService $SocialLinkService;

    public function __construct(
        SocialLinkService $SocialLinkService
    ) {
        $this->SocialLinkService = $SocialLinkService;
    }

    public function index(Request $request)
    {
        $data = $this->SocialLinkService->index($request);
        return $this->success(
            data: $data,
            message: 'Social links fetched successfully'
        );
    }

    public function store(AddSocialLinkRequest $request)
    {
        $data = $request->validated();
        $data = $this->SocialLinkService->store(
            data: $data,
            icon: $request->icon
        );
        return $this->success(
            data: $data,
            message: 'Social link added successfully'
        );
    }

    public function show($id)
    {
        $data = $this->SocialLinkService->show($id);
        return $this->success(
            data: $data,
            message: 'Social link fetched successfully'
        );
    }

    public function update(UpdateSocialLinkRequest $request, $id)
    {
        $data = $request->validated();

        $data = $this->SocialLinkService->update(
            data: $data,
            icon: $request->icon,
            id: $id
        );
        return $this->success(
            data: $data,
            message: 'Social link updated successfully'
        );
    }

    public function destroy(Request $request, $id)
    {
        $data = $this->SocialLinkService->destroy($request, $id);
        return $this->success(
            data: $data,
            message: 'Social link deleted successfully'
        );
    }
}
