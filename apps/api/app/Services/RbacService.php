<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RbacService
{
    private const GUARD = 'sanctum';

    public function listPermissions(): array
    {
        return Permission::query()
            ->where('guard_name', self::GUARD)
            ->orderBy('name')
            ->get(['id', 'name'])
            ->toArray();
    }

    public function listRoles(): array
    {
        return Role::query()
            ->where('guard_name', self::GUARD)
            ->with('permissions:id,name')
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->values(),
            ])
            ->toArray();
    }

    /**
     * @param  array<int, string>  $permissions
     */
    public function createRole(string $name, array $permissions): array
    {
        $role = Role::query()->create([
            'name' => $name,
            'guard_name' => self::GUARD,
        ]);
        $role->syncPermissions($permissions);

        return $this->formatRole($role->fresh('permissions'));
    }

    /**
     * @param  array<int, string>  $permissions
     */
    public function updateRole(Role $role, string $name, array $permissions): array
    {
        $role->update(['name' => $name]);
        $role->syncPermissions($permissions);

        return $this->formatRole($role->fresh('permissions'));
    }

    public function deleteRole(Role $role): void
    {
        $role->delete();
    }

    public function listUsers(array $filters): LengthAwarePaginator
    {
        $query = User::query()
            ->with(['roles:id,name', 'permissions:id,name'])
            ->orderByDesc('id');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function (Builder $inner) use ($search): void {
                $inner->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->paginate((int) ($filters['per_page'] ?? 20));
    }

    /**
     * @param  array<int, string>  $roles
     */
    public function createUser(array $payload, array $roles): User
    {
        $user = User::query()->create($payload);
        $user->syncRoles($roles);

        return $user->fresh(['roles:id,name', 'permissions:id,name']);
    }

    /**
     * @param  array<int, string>  $roles
     */
    public function updateUser(User $user, array $payload, array $roles): User
    {
        $user->update($payload);
        $user->syncRoles($roles);

        return $user->fresh(['roles:id,name', 'permissions:id,name']);
    }

    private function formatRole(Role $role): array
    {
        return [
            'id' => $role->id,
            'name' => $role->name,
            'permissions' => $role->permissions->pluck('name')->values(),
        ];
    }
}
