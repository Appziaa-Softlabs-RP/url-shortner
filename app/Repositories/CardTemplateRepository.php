<?php

namespace App\Repositories;

use App\Models\CardTemplate;

class CardTemplateRepository
{

    protected CardTemplate $cardTemplate;

    public function __construct(CardTemplate $cardTemplate)
    {
        $this->cardTemplate = $cardTemplate;
    }

    public function index()
    {
        return $this->cardTemplate->all();
    }

    public function store($data)
    {
        return $this->cardTemplate->create($data);
    }

    public function show($id)
    {
        return $this->cardTemplate->findOrFail($id);
    }

    public function update($data, $id)
    {
        $cardTemplate = $this->cardTemplate->findOrFail($id);
        return $cardTemplate->update($data);
    }

    public function destroy($id)
    {
        $cardTemplate = $this->cardTemplate->findOrFail($id);
        return $cardTemplate->delete();
    }

}
