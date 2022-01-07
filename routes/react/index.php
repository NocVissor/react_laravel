<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\System\AuthController;
use App\Services\Soft\Http;

Route::get('/', [HomeController::class, 'home']);

use App\Http\Controllers\ProfileController;
Route::get('/settings', [ProfileController::class, 'getSettings'])->middleware(['auth']);
Route::post('/settings', [ProfileController::class, 'setSettings'])->middleware(['auth']);

Route::get('/login', function(){ return Http::success(); })->name('login');
Route::get('/register', function(){ return Http::success(); });
Route::get('/logout', [AuthController::class, 'logout']);


Route::any('/example', [TestController::class, 'example']);
//Route::any('/example2', [TestController::class, 'example2']);



Route::get('email/verify/{id}/{hash}', [AuthController::class,'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verify/resend', [AuthController::class,'send'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');
