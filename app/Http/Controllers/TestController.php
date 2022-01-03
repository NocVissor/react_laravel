<?php

namespace App\Http\Controllers;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
class TestController extends BaseController
{
    function example(){
        return Http::success(['test'=>"1 ".rand(0, 999) ]);
    }
    function example2(){
        return Http::success(['test'=>'2 '.rand(0, 999)]);
    }
}
