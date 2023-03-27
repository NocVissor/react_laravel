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
use App\Services\Apis\Sms;
use App\Models\PhoneCode;

class AuthController extends BaseController{
    public function login(Request $request){
        $validated = Validator::make($request->all(), [
            'password' => ['required', 'string'],
            'phone' => ['required', 'string', 'max:255', 'min:8'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }

        $auth = Auth::attempt(['phone' => request('phone'), 'password' => request('password')]);
        if($auth){
            return Http::success();
        }
        else{
            return Http::error(['messageError'=>'Телефон или пароль не верны!']);
        }
    }

    public function SendPhoneCode(){
        $validated = Validator::make(request()->all(), [
            'phone' => ['required', 'string', 'max:255', 'min:8', 'unique:users'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        $phone = request('phone');
        $code = rand(10000, 99999);
        Sms::send($phone, $code);
        $oldCode = PhoneCode::where('phone', request('phone'))->first();
        if($oldCode){
            $oldCode->delete();
        }
        PhoneCode::create([
            'phone' => $phone,
            'code' => $code
        ]);
        return Http::success();
    }

    public function confirmPhone(){
        $validated = Validator::make(request()->all(), [
            'code' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255', 'min:8', 'unique:users'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        if(PhoneCode::where('phone', request('phone'))->where('code', request('code'))->first()){
            return Http::success();
        }
        else{
            return Http::error(['code'=>['Код неверный']]);
        }
    }

    public function register(Request $request){
        $validated = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', 'unique:users'],
            'phone' => ['required', 'string', 'max:255', 'min:8', 'unique:users'],
            'code' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        if(!PhoneCode::where('phone', request('phone'))->where('code', request('code'))->first()){
            return Http::error(['phone'=>['Ошибка в подтверждении телефона!']]);
        }
        $user = User::create([
            'password' => Hash::make($request['password']),
            'role' => 'user',
            'name' => $request['name'],
            'phone' => $request['phone'],
            'email' => $request['email'],
            'phone_verified_at' => date('Y-m-d H:i:s')
        ]);
        // event(new Registered($user));
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
