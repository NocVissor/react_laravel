<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;


use App\Http\Controllers\System\ReactController;
Route::post('/init', [ReactController::class, 'init']);

Route::get('/', [HomeController::class, 'home']);

use App\Http\Controllers\ProfileController;
Route::get('/settings', [ProfileController::class, 'getSettings'])->middleware(['auth']);
Route::post('/settings', [ProfileController::class, 'setSettings'])->middleware(['auth']);



Route::any('/example', [TestController::class, 'example']);
//Route::any('/example2', [TestController::class, 'example2']);


require base_path('routes/react/auth.php');
require base_path('routes/react/admin.php');
