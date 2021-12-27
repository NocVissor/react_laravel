<?php

namespace App\Http\Controllers;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;

class TestController extends BaseController
{
    function example(){
        $test = session('test', 0);
        session(['test'=>$test+1]);
        $test = session('test', 0);
        return Http::success(['test'=>$test]);
    }
}
