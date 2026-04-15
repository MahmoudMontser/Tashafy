<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Services\PageSectionService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageSectionController extends Controller
{
    public function __construct(private readonly PageSectionService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['page_id', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $this->validateSection($request);
        return response()->json($this->service->create($data), 201);
    }

    public function show(PageSection $pageSection)
    {
        return response()->json($this->service->show($pageSection));
    }

    public function update(Request $request, PageSection $pageSection)
    {
        $data = $this->validateSection($request, $pageSection);
        return response()->json($this->service->update($pageSection, $data));
    }

    public function destroy(PageSection $pageSection)
    {
        $this->service->delete($pageSection);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateSection(Request $request, ?PageSection $section = null): array
    {
        $unique = Rule::unique('page_sections', 'key')
            ->where(fn ($q) => $q->where('page_id', $request->input('page_id')));
        if ($section) $unique->ignore($section->id);

        return $request->validate([
            'page_id' => ['required', 'integer', 'exists:pages,id'],
            'key' => ['required', 'string', $unique],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_enabled' => ['nullable', 'boolean'],
            'content' => ['nullable', 'array'],
        ]);
    }
}
