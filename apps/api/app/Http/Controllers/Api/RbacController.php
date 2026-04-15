<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RbacService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class RbacController extends Controller
{
    public function __construct(private readonly RbacService $service)
    {
    }

    public function permissions()
    {
        return response()->json(['data' => $this->service->listPermissions()]);
    }

    public function roles()
    {
        return response()->json(['data' => $this->service->listRoles()]);
    }

    public function storeRole(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120', Rule::unique('roles', 'name')->where('guard_name', 'sanctum')],
            'permissions' => ['array'],
            'permissions.*' => ['string', Rule::exists('permissions', 'name')->where('guard_name', 'sanctum')],
        ]);

        $role = $this->service->createRole($data['name'], $data['permissions'] ?? []);

        return response()->json(['data' => $role], 201);
    }

    public function updateRole(Request $request, Role $role)
    {
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:120',
                Rule::unique('roles', 'name')->ignore($role->id)->where('guard_name', 'sanctum'),
            ],
            'permissions' => ['array'],
            'permissions.*' => ['string', Rule::exists('permissions', 'name')->where('guard_name', 'sanctum')],
        ]);

        $updated = $this->service->updateRole($role, $data['name'], $data['permissions'] ?? []);

        return response()->json(['data' => $updated]);
    }

    public function destroyRole(Role $role)
    {
        $this->service->deleteRole($role);

        return response()->json(['message' => 'Deleted']);
    }

    public function users(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:150'],
            'per_page' => ['nullable', 'integer', 'min:10', 'max:100'],
        ]);

        return response()->json($this->service->listUsers($filters));
    }

    public function storeUser(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'roles' => ['array'],
            'roles.*' => ['string', Rule::exists('roles', 'name')->where('guard_name', 'sanctum')],
        ]);

        $user = $this->service->createUser([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ], $data['roles'] ?? []);

        return response()->json(['data' => $user], 201);
    }

    public function updateUser(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
            'roles' => ['array'],
            'roles.*' => ['string', Rule::exists('roles', 'name')->where('guard_name', 'sanctum')],
        ]);

        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];
        if (!empty($data['password'])) {
            $payload['password'] = bcrypt($data['password']);
        }

        $updated = $this->service->updateUser($user, $payload, $data['roles'] ?? []);

        return response()->json(['data' => $updated]);
    }
}
