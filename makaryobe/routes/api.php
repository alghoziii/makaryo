<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingTransactionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HomeServiceController;
use App\Models\BookingTransaction;
use App\Models\HomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth routes (public)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Auth routes (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/service/{homeService:slug}', [HomeServiceController::class, 'show']);
Route::apiResource('/services', HomeServiceController::class);

Route::get('/category/{category:slug}', [CategoryController::class, 'show']);
Route::apiResource('/categories', CategoryController::class);

Route::post('/booking-transaction', [BookingTransactionController::class, 'store']);
Route::post('/check-booking',[BookingTransactionController::class, 'booking_details']);