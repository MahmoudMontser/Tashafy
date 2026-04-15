<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RbacSeeder extends Seeder
{
    public const GUARD = 'sanctum';

    /**
     * @var array<int, string>
     */
    private array $permissions = [
        'dashboard.view',
        'providers.view',
        'providers.create',
        'providers.update',
        'providers.delete',
        'providers.commerce.manage',
        'content.pages.manage',
        'content.navigation.manage',
        'content.media.manage',
        'content.seo.manage',
        'content.blog.manage',
        'reservations.view',
        'reservations.update',
        'settings.app.manage',
        'settings.seo.manage',
        'users.view',
        'users.create',
        'users.update',
        'users.delete',
        'roles.view',
        'roles.create',
        'roles.update',
        'roles.delete',
    ];

    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        foreach ($this->permissions as $name) {
            Permission::query()->firstOrCreate([
                'name' => $name,
                'guard_name' => self::GUARD,
            ]);
        }

        $superAdmin = Role::query()->firstOrCreate([
            'name' => 'super-admin',
            'guard_name' => self::GUARD,
        ]);
        $superAdmin->syncPermissions($this->permissions);

        $contentManager = Role::query()->firstOrCreate([
            'name' => 'content-manager',
            'guard_name' => self::GUARD,
        ]);
        $contentManager->syncPermissions([
            'dashboard.view',
            'content.pages.manage',
            'content.navigation.manage',
            'content.media.manage',
            'content.seo.manage',
            'content.blog.manage',
            'providers.view',
            'reservations.view',
        ]);

        $admin = User::query()->firstOrCreate(
            ['email' => 'admin@tashafy.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Password123!'),
            ]
        );
        $admin->assignRole($superAdmin);

        // Ensure at least one existing account can always access the admin panel.
        $primaryAdmin = User::query()->orderBy('id')->first();
        if ($primaryAdmin) {
            $primaryAdmin->assignRole($superAdmin);
        }
    }
}
