<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']); // optional: add login
Route::get('/course-list',[CourseController::class,'index']);
// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::resource('course', CourseController::class);
    Route::post('/logout', [AuthController::class, 'logout']); // optional logout
});
