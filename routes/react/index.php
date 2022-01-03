<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\System\AuthController;
use App\Services\Soft\Http;

Route::get('/', [HomeController::class, 'home']);
Route::get('/login', function(){
    return Http::success();
});

Route::any('/example', [TestController::class, 'example']);
Route::any('/example2', [TestController::class, 'example2']);
