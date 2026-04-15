<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/api-docs', 'api-docs')->name('api-docs');
Route::view('/api-docs/frontend', 'api-docs-frontend')->name('api-docs-frontend');
Route::view('/system-docs', 'system-docs')->name('system-docs');
