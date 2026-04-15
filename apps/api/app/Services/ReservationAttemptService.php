<?php

namespace App\Services;

use App\Models\Provider;
use App\Models\ProviderPackage;
use App\Models\ReservationAttempt;
use App\Models\Setting;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ReservationAttemptService
{
    public function listForAdmin(array $filters): LengthAwarePaginator
    {
        $q = ReservationAttempt::query()->with(['provider:id,slug,name', 'package:id,provider_id,name,price,currency']);

        if (!empty($filters['status'])) {
            $q->where('status', $filters['status']);
        }

        if (!empty($filters['search'])) {
            $search = trim((string)$filters['search']);
            $q->where(function ($qq) use ($search) {
                $qq->where('item_name', 'like', "%{$search}%")
                    ->orWhere('provider_name', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%");
            });
        }

        $perPage = (int)($filters['per_page'] ?? 20);
        return $q->latest('id')->paginate($perPage);
    }

    public function createFromPublicPayload(array $data, Request $request): array
    {
        $provider = !empty($data['provider_id'])
            ? Provider::query()->find($data['provider_id'])
            : null;

        $package = !empty($data['provider_package_id'])
            ? ProviderPackage::query()->find($data['provider_package_id'])
            : null;

        $settingsValue = Setting::query()->where('key', 'reservation.whatsapp')->value('value') ?? [];
        $settingsValue = is_array($settingsValue) ? $settingsValue : [];
        $configuredNumber = $settingsValue['number'] ?? null;
        $template = $settingsValue['default_message'] ?? 'Hello, I want to reserve: {item_name}. Provider: {provider_name}.';

        $providerName = $data['provider_name'] ?? $provider?->name['en'] ?? $provider?->name['ar'] ?? null;
        $itemName = $data['item_name'] ?? $package?->name['en'] ?? $package?->name['ar'] ?? null;

        $message = $data['message'] ?? strtr($template, [
            '{item_name}' => (string)($itemName ?? ''),
            '{provider_name}' => (string)($providerName ?? ''),
            '{reservation_type}' => (string)($data['reservation_type'] ?? 'reservation'),
            '{locale}' => (string)($data['locale'] ?? ''),
        ]);
        $message = trim($message);

        $targetNumber = $data['whatsapp_number'] ?? $configuredNumber;
        $normalizedNumber = $this->normalizePhone($targetNumber);
        $whatsappUrl = $normalizedNumber
            ? "https://wa.me/{$normalizedNumber}?text=" . urlencode($message)
            : null;

        $attempt = ReservationAttempt::create([
            'provider_id' => $provider?->id,
            'provider_package_id' => $package?->id,
            'source' => $data['source'] ?? 'website',
            'locale' => $data['locale'] ?? null,
            'reservation_type' => $data['reservation_type'] ?? 'package',
            'item_name' => $itemName,
            'provider_name' => $providerName,
            'status' => 'new',
            'customer_name' => $data['customer_name'] ?? null,
            'customer_phone' => $data['customer_phone'] ?? null,
            'message' => $message ?: null,
            'whatsapp_number' => $normalizedNumber,
            'whatsapp_url' => $whatsappUrl,
            'metadata' => $data['metadata'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => substr((string)$request->userAgent(), 0, 1000) ?: null,
            'referrer' => $request->headers->get('referer'),
        ]);

        return [
            'attempt' => $attempt->load(['provider:id,slug,name', 'package:id,provider_id,name,price,currency']),
            'whatsapp_url' => $whatsappUrl,
        ];
    }

    public function updateFromAdmin(ReservationAttempt $attempt, array $data): ReservationAttempt
    {
        $attempt->update($data);
        return $attempt->load(['provider:id,slug,name', 'package:id,provider_id,name,price,currency']);
    }

    private function normalizePhone(?string $phone): ?string
    {
        if (!$phone) {
            return null;
        }

        $normalized = preg_replace('/\D+/', '', $phone);
        return $normalized ?: null;
    }
}
