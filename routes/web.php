<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require base_path('routes/react/index.php');


use App\Services\Soft\Http;

use App\Jobs\Test;
Route::get('/queue', function(){
    echo now()->addHours(30);
    Test::withChain([

    ])->dispatch('create = '.date('Y-m-d H:i:s').', test');
});

Route::get('/event', function(){
    \App\Events\TestEvent::dispatch('event message');
});

Route::any('/{page?}',function(){
    return Http::notFound();
  })->where('page','.*');
