<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/{code}', [UrlController::class, 'redirect']);
