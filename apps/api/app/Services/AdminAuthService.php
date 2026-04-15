<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminAuthService
{
    public function authPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values(),
            'permissions' => $user->getAllPermissions()->pluck('name')->values(),
        ];
    }

    public function login(string $email, string $password): ?array
    {
        $user = User::query()->where('email', $email)->first();
        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        return [
            'token' => $user->createToken('admin')->plainTextToken,
            'user' => $this->authPayload($user),
        ];
    }

    public function logout(?object $user): void
    {
        if ($user?->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }
    }
}
