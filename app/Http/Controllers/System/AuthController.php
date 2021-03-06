<?php

namespace App\Http\Controllers\System;
use Illuminate\Routing\Controller as BaseController;
use App\Services\Soft\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

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

    public function register(Request $request){
        $validated = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        $user = User::create([
            'password' => Hash::make($request['password']),
            'role' => 'user',
            'name' => $request['name'],
            'email' => $request['email']
        ]);
        event(new Registered($user));
        Auth::login($user);
        return Http::success();
    }

    public function verify(Request $request){
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return Http::success(['statusVerify'=>'already']);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return Http::success(['statusVerify'=>'success']);
    }

    public function send(Request $request){
        $request->user()->sendEmailVerificationNotification();
        return Http::success(['status'=>'send']);
    }

    public function logout()
    {
        Auth::logout();
        return Http::success();
    }

    public function forgot(Request $request){
        $validated = Validator::make($request->all(), [
            'email' => ['required', 'email']
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }

        if(!User::where('email', $request['email'])->first()){
            return Http::error(['messageError'=>'Пользователь с таким email не найден']);
        }

        $status = Password::sendResetLink(
            ['email' => $request['email']]
        );

        if($status == 'passwords.sent'){
            return Http::success();
        }
        else if($status == 'passwords.throttled'){
            return Http::error(['messageError'=>'Отправлено слишком много сообщений']);
        }
    }

    public function resend(Request $request){
        $validated = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if($status == Password::PASSWORD_RESET){
            return Http::success();
        }
        else{
            return Http::error(['messageError'=>'Не удалось сбросить пароль']);
        }
    }
}
