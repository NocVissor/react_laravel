<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create admin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->ask('enter name:');
        $email = $this->ask('enter email');
        $password = $this->ask('enter password, or skip for random password');
        $password = $password??Str::random(8);
        $hash = Hash::make($password);

        User::create([
            'name'=>$name,
            'email'=>$email,
            'password'=>$hash,
            'role'=>'admin'
        ]);

        $this->info('Create admin, name: '.$name.', email: '.$email.', password: '.$password);
    }
}
