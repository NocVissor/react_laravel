<?php

namespace App\Http\Controllers\System;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;
use App\Services\Soft\Init;
class ReactController extends BaseController
{
    function init(){
        return Http::success(Init::getState());
    }
}
