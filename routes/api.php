<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


use App\Services\Soft\Http;

Route::post('/test', function (Request $request){
    $result = $request->all();
    $result['test'] = true;
    $result['session'] = session('key', 0);

    session(['key' => session('key', 0)+1]);

    return Http::success($result);
});
