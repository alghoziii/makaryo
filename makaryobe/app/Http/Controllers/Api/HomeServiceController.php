<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\HomeServiceApiResource;
use App\Models\HomeService;
use Illuminate\Http\Request;

class HomeServiceController extends Controller
{
    //
    public function index(Request $request)
    {
        $homeSevices = HomeService::with(['category']);

        if ($request->has('category_id')) {
            $homeSevices->where('category_id', $request->input('category_id')); 
        }
        if ($request->has('is_popular')) {
            $homeSevices->where('is_popular', $request->input('is_popular')); 
        }
        if ($request->has('limit')) {
            $homeSevices->limit( $request->input('limit')); 
        }
        return HomeServiceApiResource::collection($homeSevices->get());
    }

    public function show(HomeService $homeService)
    {
        $homeService->load(['category', 'benefits', 'testimonials']);
        return new HomeServiceApiResource($homeService);
    }
}