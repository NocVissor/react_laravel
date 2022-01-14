<?php


use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\System\AuthController;
use App\Services\Soft\Http;


use App\Http\Controllers\System\ReactController;
Route::post('/init', [ReactController::class, 'init']);

Route::get('/', [HomeController::class, 'home']);

use App\Http\Controllers\ProfileController;
Route::get('/settings', [ProfileController::class, 'getSettings'])->middleware(['auth']);
Route::post('/settings', [ProfileController::class, 'setSettings'])->middleware(['auth']);

Route::get('/login', function(){ return Http::success(); })->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', function(){ return Http::success(); });
Route::post('/register', [AuthController::class, 'register']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/password/forgot', function(){ return Http::success(); });
Route::post('/password/forgot', [AuthController::class, 'forgot']);

Route::get('/password/resend',function(){ return Http::success(); } )->name('password.reset');
Route::post('/password/resend', [AuthController::class, 'resend']);

Route::any('/example', [TestController::class, 'example']);
//Route::any('/example2', [TestController::class, 'example2']);



Route::get('/email/verify/{id}/{hash}', [AuthController::class,'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verify/resend', [AuthController::class,'send'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');




require base_path('routes/react/admin.php');
