<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\PageService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    public function __construct(private readonly PageService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['status', 'search', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $this->validatePage($request);
        return response()->json($this->service->create($data), 201);
    }

    public function show(Page $page)
    {
        return response()->json($this->service->show($page));
    }

    public function update(Request $request, Page $page)
    {
        $data = $this->validatePage($request, $page->id);
        return response()->json($this->service->update($page, $data));
    }

    public function destroy(Page $page)
    {
        $this->service->delete($page);
        return response()->json(['message' => 'Deleted']);
    }

    private function validatePage(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'key' => ['required', 'string', Rule::unique('pages', 'key')->ignore($id)],
            'slug' => ['required', 'string', Rule::unique('pages', 'slug')->ignore($id)],
            'title' => ['nullable', 'array'],
            'title.ar' => ['nullable', 'string'],
            'title.en' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['draft', 'published'])],
        ]);
    }
}
