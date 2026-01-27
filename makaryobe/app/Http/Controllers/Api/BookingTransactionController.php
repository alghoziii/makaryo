<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingTransactionRequest;
use App\Http\Resources\Api\BookingTransactionApiResource;
use App\Models\BookingTransaction;
use App\Models\HomeService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingTransactionController extends Controller
{
    //
    public function store(StoreBookingTransactionRequest $request)
    {
        try {
            $validatedData = $request->validated();

            // Handle file upload
            if ($request->hasFile('proof')) {
                $filePath = $request->file('proof')->store('proofs', 'public');
                $validatedData['proof'] = $filePath;
            }

            //Retrieve service IDs from the request
            $serviceIds = $validatedData['service_ids'];

            if (empty($serviceIds)) {
                return response()->json([
                    'message' => 'No services selected'
                ], 400);
            }
            //fetch services from DB
            $services = HomeService::whereIn('id', $serviceIds)->get();

            if ($services->isEmpty()) {
                return response()->json([
                    'message' => 'Invalid service IDs'
                ], 404);
            }

            //Calculate total price,Tax, insurance, and grand total
            $totalPrice = $services->sum('price');
            $tax = 0.11 * $totalPrice;
            $grandTotal = $totalPrice + $tax;

            //Use Carbon to set schedule_at to tomoorrow's date 
            $validatedData['schedule_at'] = Carbon::tomorrow()->toDateString();

            //Populate the booking transaction data
            $validatedData['total_amount'] = $grandTotal;
            $validatedData['total_tax_amount'] = $tax;
            $validatedData['sub_total'] = $totalPrice;
            $validatedData['is_paid'] = false;
            $validatedData['booking_trx_id'] = BookingTransaction::generateUniqueTrxId();

            //Create the booking transaction
            $bookingTransaction = BookingTransaction::create($validatedData);

            if (!$bookingTransaction) {
                return response()->json([
                    'message' => 'Booking transaction not created'
                ], 500);
            }

            //Create transaction details for each service
            foreach ($services as $service) {
                $bookingTransaction->transactionDetails()->create([
                    'home_service_id' => $service->id,
                    'price' => $service->price,
                ]);
            }

            return new BookingTransactionApiResource($bookingTransaction->load('transactionDetails'));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function booking_details(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'booking_trx_id' => 'required|string',
        ]);

        $booking = BookingTransaction::where('email', $request->email)
            ->where('booking_trx_id', $request->booking_trx_id)
            ->with([
                'transactionDetails',
                'transactionDetails.homeService',
            ])->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking transaction not found'
            ], 404);
        }

        return new BookingTransactionApiResource($booking);
    }
}
