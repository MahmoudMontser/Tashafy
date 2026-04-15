<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;
use App\Services\NavigationItemService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NavigationItemController extends Controller
{
    public function __construct(private readonly NavigationItemService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['group', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $this->validateItem($request);
        return response()->json($this->service->create($data), 201);
    }

    public function show(NavigationItem $navigationItem)
    {
        return response()->json($navigationItem);
    }

    public function update(Request $request, NavigationItem $navigationItem)
    {
        $data = $this->validateItem($request);
        return response()->json($this->service->update($navigationItem, $data));
    }

    public function destroy(NavigationItem $navigationItem)
    {
        $this->service->delete($navigationItem);
        return response()->json(['message' => 'Deleted']);
    }

    private function validateItem(Request $request): array
    {
        return $request->validate([
            'group' => ['required', Rule::in(['header', 'footer'])],
            'label' => ['required', 'array'],
            'label.ar' => ['required', 'string'],
            'label.en' => ['required', 'string'],
            'path' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_enabled' => ['nullable', 'boolean'],
        ]);
    }
}
