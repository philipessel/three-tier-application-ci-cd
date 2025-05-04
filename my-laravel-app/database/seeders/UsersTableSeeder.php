<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed a new user
        User::create([
            'name' => 'Tester', 
            'username' => 'test_user',
            'email' => 'test2@example.com',
            'password' => Hash::make('password123'), // Encrypt the password
          //'password' => bcrypt('password123'),  <==== Note: passwords can also be defined this way in the seeder. the first method is however the best.
        ]);
    }
}
