<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $admin = User::factory()->make(['role'=>'admin']);
        $response = $this->actingAs($admin)->call('get', '/api/admin/users/all', ['api'=>true, 'count'=>20, 'page'=>1]);
        $response->assertStatus(200)->assertJson([
            'users' => true,
        ]);;
    }
}
