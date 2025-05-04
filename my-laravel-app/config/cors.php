<?php

//return [
//    'paths' => ['api/*', 'sanctum/csrf-cookie'],
//    'allowed_methods' => ['*'],
//    'allowed_origins' => ['*'],
//    'allowed_origins_patterns' => [],
//    'allowed_headers' => ['*'],
//   'exposed_headers' => [],
//    'max_age' => 0,
//  'supports_credentials' => false,
//];




// return [
//     'paths' => ['api/*', 'sanctum/csrf-cookie'],
//     'allowed_methods' => ['*'],
//     'allowed_origins' => [env('CORS_ALLOWED_ORIGINS', '*')],
//     'allowed_origins_patterns' => [],
//     'allowed_headers' => ['*'],
//     'exposed_headers' => [],
//     'max_age' => 0,
//     'supports_credentials' => true,
// ];


return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // ✅ Allow API and CSRF cookie requests
    'allowed_methods' => ['*'], // ✅ Allow all request methods (GET, POST, etc.)
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')), // ✅ Allow frontend URL(s)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // ✅ Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // ✅ Required for Sanctum session authentication
];
