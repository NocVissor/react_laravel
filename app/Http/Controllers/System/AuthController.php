<?php

namespace App\Http\Controllers\System;
use Illuminate\Routing\Controller as BaseController;
use App\Services\Soft\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthController extends BaseController{
    public function login(Request $request){
        $validated = Validator::make($request->all(), [
            'password' => ['required', 'string'],
            'email' => ['required', 'email'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }



        $credentials = request(['email', 'password']);
        $auth = Auth::attempt($credentials, request('remember'));
        if($auth){
            return Http::success();
        }
        else{
            return Http::error(['messageError'=>'email или пароль не верны!']);
        }
    }

    public function register(){
        $credentials = request(['email', 'password']);
        $auth = Auth::attempt($credentials, request('remember'));
        if($auth){
            return Http::success();
        }
        else{
            return Http::error();
        }
    }
}
