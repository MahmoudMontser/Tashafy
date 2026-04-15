<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Public\PublicReservationAttemptStoreResource;
use App\Models\ReservationAttempt;
use App\Services\ReservationAttemptService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReservationAttemptController extends Controller
{
    public function __construct(private readonly ReservationAttemptService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->listForAdmin($request->only(['status', 'search', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'provider_id' => ['nullable', 'integer', 'exists:providers,id'],
            'provider_package_id' => ['nullable', 'integer', 'exists:provider_packages,id'],
            'source' => ['nullable', 'string', 'max:120'],
            'locale' => ['nullable', 'string', 'max:10'],
            'reservation_type' => ['nullable', 'string', 'max:30'],
            'item_name' => ['nullable', 'string', 'max:255'],
            'provider_name' => ['nullable', 'string', 'max:255'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:40'],
            'message' => ['nullable', 'string'],
            'whatsapp_number' => ['nullable', 'string', 'max:30'],
            'metadata' => ['nullable', 'array'],
        ]);

        $result = $this->service->createFromPublicPayload($data, $request);
        return (new PublicReservationAttemptStoreResource($result))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, ReservationAttempt $reservationAttempt)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'contacted', 'converted', 'cancelled'])],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:40'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        return response()->json($this->service->updateFromAdmin($reservationAttempt, $data));
    }
}
