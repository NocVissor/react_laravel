<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;

Route::get('/', [HomeController::class, 'home']);

Route::any('/example', [TestController::class, 'example']);
