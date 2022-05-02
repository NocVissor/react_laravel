<?php

namespace App\Http\Controllers;

use App\Services\Soft\Http;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use App\Events\RedisEvent;
class WebSocket extends BaseController
{
    function redis(){
        event(new RedisEvent(date('d-m-Y H:i:s')));
        return "ss";
    }
}
