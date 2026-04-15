<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AdminAuthService;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function __construct(private readonly AdminAuthService $service)
    {
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','string'],
        ]);

        $result = $this->service->login($data['email'], $data['password']);
        if (!$result) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }
        return response()->json($result);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $this->service->authPayload($request->user())]);
    }

    public function logout(Request $request)
    {
        $this->service->logout($request->user());
        return response()->json(['message' => 'Logged out']);
    }
}
