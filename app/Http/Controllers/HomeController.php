<?php

namespace App\Http\Controllers;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{
    function home(){
        $test = session('test', 0);
        session(['test'=>$test+1]);
        return Http::success(['test'=>$test]);
    }
}
