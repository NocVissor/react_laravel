<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Services\Soft\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Auth\Events\Registered;

class ProfileController extends BaseController{
    public function getSettings(Request $request){
        $user = Auth::user();

        return Http::success(['user' => [
            'name' => $user->name,
            'email' => $user->email
        ]]);
    }

    public function setSettings(Request $request){
        $user = $request->user();

        $validated = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->name, 'name')],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->email, 'email')],
            'old' => ['nullable', 'string'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        $pass = false;
        if($request['old'] || $request['password'] || $request['old']){
            if(Hash::check($request['old'], $user->password)){
                $user->password = Hash::make($request['password']);
                $pass = true;
            }
            else{
                return Http::error(['old' => ['Старый пароль введён не правильно!']]);
            }
        }
        if($request['email'] != $user->email){
            $user->email_verified_at = null;
            event(new Registered($user));
        }
        $user->email = $request['email'];
        $user->name = $request['name'];
        $user->save();
        return Http::success(['pass'=>$pass]);

    }
}
