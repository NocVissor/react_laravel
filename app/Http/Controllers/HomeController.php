<?php

namespace App\Http\Controllers;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;

class HomeController extends BaseController
{
    function home(){
        return Http::success();
    }
}
