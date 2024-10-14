<?php

namespace App\Http\Controllers\v1\global;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Models\PinCode;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    use HttpResponse;

    public function searchByCityOrPinCode()
    {
        $search = request()->query('search');

        if(!$search || $search == '') {
            return $this->error(
                message: 'Search query is required'
            );
        }

        $results = PinCode::where('name', 'like', '%' . $search . '%')
            ->orWhere('pin_code', 'like', '%' . $search . '%')
            ->limit(10)
            ->get();

        return $this->success(
            data: $results,
            message: 'Search results'
        );
    }

}
