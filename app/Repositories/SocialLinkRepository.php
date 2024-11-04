<?php

namespace App\Repositories;

use App\Models\SocialLink;

class SocialLinkRepository
{
    protected SocialLink $SocialLink;

    public function __construct(
        SocialLink $SocialLink
    ) {
        $this->SocialLink = $SocialLink;
    }

    public function index($request)
    {
        return $this->SocialLink
        ->where('name', 'like', '%' . $request->search . '%')
        ->paginate($request->limit);
    }

    public function store($data)
    {
        return $this->SocialLink->create($data);
    }

    public function show($id)
    {
        return $this->SocialLink->find($id);
    }

    public function update($data, $id)
    {
        return $this->SocialLink->where('id', $id)
            ->update($data);
    }

    public function destroy($request, $id)
    {
        return $this->SocialLink->where('id', $id)->delete();
    }

    public function getActiveSocialLinks($cardId)
    {
        return $this->SocialLink->where('card_id', $cardId)->where('status', 1)->get();
    }
}
