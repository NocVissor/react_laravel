<?php
namespace App\Http\Controllers\Admin;
use App\Services\Soft\Http;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersController extends BaseController{
    public function all(Request $request)
    {
        if(Http::check_ajax()){
            $skip = $request->input('count')*($request->input('page')-1);
            $take = $request->input('count');
        }
        else{
            $skip = 0;
            $take = 20;
            Http::$body['count'] = User::custom_count();
        }
        $users = User::skip($skip)->take($take)->orderBy('id', 'DESC')->get();
        return Http::success(['users' => $users]);
    }
    public function count()
    {
        $count = User::custom_count();
        return Http::success(['count' => $count]);
    }
    public function getUser(User $user)
    {
        return Http::success(['user' => $user]);
    }
    public function setUser(User $user, Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->name, 'name')],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->email, 'email')],
            'password' => ['nullable', 'string', 'confirmed'],
            'verify' => ['boolean', 'min:8'],
        ]);
        if ($validated->fails()) {
            return Http::error($validated->errors()->toArray());
        }
        if($request['password']){
            $user->password = Hash::make($request['password']);
        }

        $user->email = $request['email'];
        $user->name = $request['name'];
        $user->verify = $request['verify'];
        $user->save();

        return Http::success();
    }
    public function remove(User $user){
        $user->remove();
        return Http::success();
    }
    public function auth(User $user){
        Auth::login($user);
        return Http::success();
    }
}
