<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ProviderMediaController;
use App\Http\Controllers\Api\ProviderDoctorController;
use App\Http\Controllers\Api\ProviderFacilityController;
use App\Http\Controllers\Api\ProviderPackageController;
use App\Http\Controllers\Api\ProviderPackageItemController;
use App\Http\Controllers\Api\ProviderTestimonialController;
use App\Http\Controllers\Api\ProviderController;
use App\Http\Controllers\Api\ReservationOptionController;
use App\Http\Controllers\Api\ReservationAttemptController;
use App\Http\Controllers\Api\NavigationItemController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PageSectionController;
use App\Http\Controllers\Api\PublicContentController;
use App\Http\Controllers\Api\RbacController;
use App\Http\Controllers\Api\SettingController;

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::get('providers', [ProviderController::class, 'index'])->middleware('permission:providers.view');
        Route::get('providers/{provider}', [ProviderController::class, 'show'])->middleware('permission:providers.view');
        Route::post('providers', [ProviderController::class, 'store'])->middleware('permission:providers.create');
        Route::put('providers/{provider}', [ProviderController::class, 'update'])->middleware('permission:providers.update');
        Route::delete('providers/{provider}', [ProviderController::class, 'destroy'])->middleware('permission:providers.delete');

        Route::get('providers/{provider}/packages', [ProviderPackageController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/packages', [ProviderPackageController::class, 'store'])->middleware('permission:providers.commerce.manage');
        Route::put('providers/{provider}/packages/{package}', [ProviderPackageController::class, 'update'])->middleware('permission:providers.commerce.manage');
        Route::delete('providers/{provider}/packages/{package}', [ProviderPackageController::class, 'destroy'])->middleware('permission:providers.commerce.manage');

        Route::get('provider-packages/{package}/items', [ProviderPackageItemController::class, 'index'])->middleware('permission:providers.view');
        Route::post('provider-packages/{package}/items', [ProviderPackageItemController::class, 'store'])->middleware('permission:providers.commerce.manage');
        Route::put('provider-packages/{package}/items/{item}', [ProviderPackageItemController::class, 'update'])->middleware('permission:providers.commerce.manage');
        Route::delete('provider-packages/{package}/items/{item}', [ProviderPackageItemController::class, 'destroy'])->middleware('permission:providers.commerce.manage');

        Route::get('providers/{provider}/reservation-options', [ReservationOptionController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/reservation-options', [ReservationOptionController::class, 'store'])->middleware('permission:providers.commerce.manage');
        Route::put('providers/{provider}/reservation-options/{option}', [ReservationOptionController::class, 'update'])->middleware('permission:providers.commerce.manage');
        Route::delete('providers/{provider}/reservation-options/{option}', [ReservationOptionController::class, 'destroy'])->middleware('permission:providers.commerce.manage');

        Route::get('providers/{provider}/media', [ProviderMediaController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/media', [ProviderMediaController::class, 'store'])->middleware('permission:content.media.manage');
        Route::put('providers/{provider}/media/{medium}', [ProviderMediaController::class, 'update'])->middleware('permission:content.media.manage');
        Route::delete('providers/{provider}/media/{medium}', [ProviderMediaController::class, 'destroy'])->middleware('permission:content.media.manage');

        Route::get('providers/{provider}/facilities', [ProviderFacilityController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/facilities', [ProviderFacilityController::class, 'store'])->middleware('permission:providers.update');
        Route::put('providers/{provider}/facilities/{facility}', [ProviderFacilityController::class, 'update'])->middleware('permission:providers.update');
        Route::delete('providers/{provider}/facilities/{facility}', [ProviderFacilityController::class, 'destroy'])->middleware('permission:providers.update');

        Route::get('providers/{provider}/doctors', [ProviderDoctorController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/doctors', [ProviderDoctorController::class, 'store'])->middleware('permission:providers.update');
        Route::put('providers/{provider}/doctors/{doctor}', [ProviderDoctorController::class, 'update'])->middleware('permission:providers.update');
        Route::delete('providers/{provider}/doctors/{doctor}', [ProviderDoctorController::class, 'destroy'])->middleware('permission:providers.update');

        Route::get('providers/{provider}/testimonials', [ProviderTestimonialController::class, 'index'])->middleware('permission:providers.view');
        Route::post('providers/{provider}/testimonials', [ProviderTestimonialController::class, 'store'])->middleware('permission:providers.update');
        Route::put('providers/{provider}/testimonials/{testimonial}', [ProviderTestimonialController::class, 'update'])->middleware('permission:providers.update');
        Route::delete('providers/{provider}/testimonials/{testimonial}', [ProviderTestimonialController::class, 'destroy'])->middleware('permission:providers.update');

        Route::apiResource('blog-posts', BlogPostController::class)->middleware('permission:content.blog.manage');
        Route::apiResource('pages', PageController::class)->middleware('permission:content.pages.manage');
        Route::apiResource('page-sections', PageSectionController::class)->middleware('permission:content.pages.manage');
        Route::apiResource('navigation-items', NavigationItemController::class)->middleware('permission:content.navigation.manage');
        Route::get('/settings', [SettingController::class, 'index'])->middleware('permission:settings.app.manage');
        Route::post('/settings', [SettingController::class, 'upsert'])->middleware('permission:settings.app.manage');
        Route::get('/settings/{key}', [SettingController::class, 'show'])->middleware('permission:settings.app.manage|content.blog.manage');
        Route::get('/reservation-attempts', [ReservationAttemptController::class, 'index'])->middleware('permission:reservations.view');
        Route::put('/reservation-attempts/{reservationAttempt}', [ReservationAttemptController::class, 'update'])->middleware('permission:reservations.update');

        Route::get('/rbac/permissions', [RbacController::class, 'permissions'])->middleware('permission:roles.view');
        Route::get('/rbac/roles', [RbacController::class, 'roles'])->middleware('permission:roles.view');
        Route::post('/rbac/roles', [RbacController::class, 'storeRole'])->middleware('permission:roles.create');
        Route::put('/rbac/roles/{role}', [RbacController::class, 'updateRole'])->middleware('permission:roles.update');
        Route::delete('/rbac/roles/{role}', [RbacController::class, 'destroyRole'])->middleware('permission:roles.delete');
        Route::get('/rbac/users', [RbacController::class, 'users'])->middleware('permission:users.view');
        Route::post('/rbac/users', [RbacController::class, 'storeUser'])->middleware('permission:users.create');
        Route::put('/rbac/users/{user}', [RbacController::class, 'updateUser'])->middleware('permission:users.update');
    });
});

Route::prefix('public')->group(function () {
    Route::get('/content/page/{key}', [PublicContentController::class, 'page']);
    Route::get('/content/navigation', [PublicContentController::class, 'navigation']);
    Route::get('/content/setting/{key}', [PublicContentController::class, 'setting']);
    Route::get('/blog', [PublicContentController::class, 'blogList']);
    Route::get('/blog/{slug}', [PublicContentController::class, 'blogDetail']);
    Route::get('/providers/{slug}', [PublicContentController::class, 'providerDetail']);
    Route::post('/reservation-attempts', [ReservationAttemptController::class, 'store']);
});

