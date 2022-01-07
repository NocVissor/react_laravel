<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\System\AuthController;
use App\Services\Soft\Http;

Route::get('/', [HomeController::class, 'home']);
Route::get('/login', function(){ return Http::success(); });
Route::get('/register', function(){ return Http::success(); });

Route::any('/example', [TestController::class, 'example']);
//Route::any('/example2', [TestController::class, 'example2']);



Route::get('email/verify/{id}/{hash}', [AuthController::class,'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verify/resend', [AuthController::class,'send'])->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');
