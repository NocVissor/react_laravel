<?php
namespace App\Services\Soft;

class Http{
    static public $code = 200;
    static public $errors = [];
    static public $body = ['code' => 200];
    static public $headers = [];


    static public function check_ajax(){
        return (isset(request()->all()['api']) && request()->all()['api']);
    }

    static public function response(){
        self::$body['errors'] = self::$errors;
        self::$body['code'] = self::$code;
        if(self::check_ajax()){
            return response(self::$body, self::$code)
                ->withHeaders(self::$headers);
        }
        else{
            self::$body['noAjax'] = true;
            self::$body['time'] = time();
            if(!isset(self::$body['title'])){
                self::$body['title'] = config('app.name');
            }

            http_response_code(self::$code);

            \JavaScript::put(
                ['serval'=>self::$body]
            );

            return response()
            ->view('react', self::$body)
            ->withHeaders(self::$headers);

        }
    }

    static public function error($errors = [], $code = 500){
        self::$errors = array_merge($errors, self::$errors);
        self::$code = $code;
        self::$body['type'] = 'error';
        return self::response();
    }

    static public function notFound(){
        return self::error([], 404);
    }


    static public function success($data = []){
        self::$body = array_merge($data, self::$body);
        self::$code = 200;
        self::$body['type'] = 'success';
        return self::response();
    }
}
