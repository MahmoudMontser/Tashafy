<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SettingService;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct(private readonly SettingService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['key', 'per_page']));
    }

    public function upsert(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', 'string'],
            'value' => ['nullable', 'array'],
        ]);

        return response()->json($this->service->upsert($data['key'], $data['value'] ?? null));
    }

    public function show(string $key)
    {
        return response()->json($this->service->getByKeyOrFail($key));
    }
}
