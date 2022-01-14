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
            'new_time' => $new_time
        ];

        $user = Auth::user();
        if($user){
            $result['user'] = [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'verify' => $user->hasVerifiedEmail()
            ];
        }

        return $result;
    }
}
