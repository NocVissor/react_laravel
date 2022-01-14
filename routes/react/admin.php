<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UsersController;

Route::group(['middleware'=>['admin'], 'prefix'=>'admin'], function(){
    Route::group(['prefix'=>'users'], function(){
        Route::get('/all', [UsersController::class, 'all']);
        Route::get('/count', [UsersController::class, 'count']);

        Route::get('/get/{user}', [UsersController::class, 'getUser']);
        Route::post('/set/{user}', [UsersController::class, 'setUser']);
        Route::post('/remove/{user}', [UsersController::class, 'remove']);
        Route::post('/auth/{user}', [UsersController::class, 'auth']);
    });
});
