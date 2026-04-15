export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;

  // GET list
  fetchPosts: () => Promise<void>;

  // GET by id
  fetchPostById: (id: number) => Promise<void>;

  // POST create
  createPost: (data: Omit<Post, "id">) => Promise<Post | null>;

  // PUT replace
  updatePost: (id: number, data: Omit<Post, "id">) => Promise<Post | null>;

  // PATCH partial update
  patchPost: (id: number, data: Partial<Omit<Post, "id">>) => Promise<Post | null>;

  // DELETE
  deletePost: (id: number) => Promise<boolean>;

  clearError: () => void;
}
