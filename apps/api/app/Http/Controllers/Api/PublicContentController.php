<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Public\PublicBlogDetailResource;
use App\Http\Resources\Public\PublicBlogListResource;
use App\Http\Resources\Public\PublicNavigationResource;
use App\Http\Resources\Public\PublicPageResource;
use App\Http\Resources\Public\PublicProviderDetailResource;
use App\Http\Resources\Public\PublicSettingResource;
use App\Http\Controllers\Controller;
use App\Services\PublicContentService;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PublicContentController extends Controller
{
    public function __construct(
        private readonly PublicContentService $service,
        private readonly SettingService $settingService,
    ) {
    }

    public function page(Request $request, string $key)
    {
        $validated = $request->validate([
            'lang' => ['nullable', Rule::in(['ar', 'en'])],
        ]);
        $lang = $validated['lang'] ?? 'ar';

        return new PublicPageResource($this->service->getPublishedPage($key, $lang));
    }

    public function navigation(Request $request)
    {
        $validated = $request->validate([
            'lang' => ['nullable', Rule::in(['ar', 'en'])],
            'group' => ['nullable', 'string', 'max:60'],
        ]);
        $lang = $validated['lang'] ?? 'ar';
        $group = $validated['group'] ?? 'header';

        return new PublicNavigationResource($this->service->getNavigation($group, $lang));
    }

    public function setting(string $key)
    {
        $setting = $this->settingService->getByKey($key);
        return new PublicSettingResource([
            'key' => $key,
            'value' => $setting?->value,
        ]);
    }

    public function blogList(Request $request)
    {
        $validated = $request->validate([
            'lang' => ['nullable', Rule::in(['ar', 'en'])],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);
        $lang = $validated['lang'] ?? 'ar';
        $perPage = (int) ($validated['per_page'] ?? 12);

        return new PublicBlogListResource($this->service->getBlogList($lang, $perPage));
    }

    public function blogDetail(Request $request, string $slug)
    {
        $validated = $request->validate([
            'lang' => ['nullable', Rule::in(['ar', 'en'])],
        ]);
        $lang = $validated['lang'] ?? 'ar';

        return new PublicBlogDetailResource($this->service->getBlogDetail($slug, $lang));
    }

    public function providerDetail(Request $request, string $slug)
    {
        $validated = $request->validate([
            'lang' => ['nullable', Rule::in(['ar', 'en'])],
        ]);
        $lang = $validated['lang'] ?? 'ar';

        return new PublicProviderDetailResource($this->service->getProviderDetail($slug, $lang));
    }
}
