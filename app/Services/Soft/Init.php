<?php
namespace App\Services\Soft;

use Illuminate\Support\Facades\Auth;

class Init{
    public static function getState(){
        $result = [
            'user' => false
        ];

        $user = Auth::user();
        if($user){
            $result['user'] = [
                'id' => $user->id
            ];
        }

        return $result;
    }
}
