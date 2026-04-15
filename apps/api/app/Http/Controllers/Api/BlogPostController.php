<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Services\BlogPostService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BlogPostController extends Controller
{
    public function __construct(private readonly BlogPostService $service)
    {
    }

    public function index(Request $request)
    {
        return $this->service->list($request->only(['status', 'search', 'per_page']));
    }

    public function store(Request $request)
    {
        $data = $this->validatePost($request);
        return response()->json($this->service->create($data), 201);
    }

    public function show(BlogPost $blogPost)
    {
        return response()->json($blogPost);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $data = $this->validatePost($request, $blogPost->id);
        return response()->json($this->service->update($blogPost, $data));
    }

    public function destroy(BlogPost $blogPost)
    {
        $this->service->delete($blogPost);
        return response()->json(['message' => 'Deleted']);
    }

    private function validatePost(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'slug' => ['required', 'string', Rule::unique('blog_posts', 'slug')->ignore($id)],
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string'],
            'title.en' => ['required', 'string'],
            'excerpt' => ['nullable', 'array'],
            'excerpt.ar' => ['nullable', 'string'],
            'excerpt.en' => ['nullable', 'string'],
            'body_ar' => ['nullable', 'string'],
            'body_en' => ['nullable', 'string'],
            'category' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'is_featured' => ['nullable', 'boolean'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
        ]);
    }
}
