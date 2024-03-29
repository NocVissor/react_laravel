<?php
namespace App\Services\Soft;

use Illuminate\Support\Facades\Auth;

class Init{
    public static function getState(){

        $old_time = request()->input('time');
        $new_time = time();

        $result = [
            'user' => false,
            'old_time' => $old_time,
            'new_time' => $new_time,
            'token' =>  csrf_token(),
        ];
        $user = Auth::user();
        if($user){
            $result['user'] = [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'verify_phone' => (bool)$user->phone_verified_at,
                'verify_email' => (bool)$user->email_verified_at
            ];
        }

        return $result;
    }
}
