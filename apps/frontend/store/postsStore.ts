import { create } from "zustand";
import api from "@/lib/api/useApi";
import { Post, PostsState } from "@/types/posts";

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<Post[]>("/posts");
      set({ posts: data, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch posts";
      set({ error: message, loading: false });
    }
  },

  fetchPostById: async (id: number) => {
    set({ loading: true, error: null, currentPost: null });
    try {
      const { data } = await api.get<Post>(`/posts/${id}`);
      set({ currentPost: data, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch post";
      set({ error: message, loading: false });
    }
  },

  createPost: async (payload: Omit<Post, "id">) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post<Post>("/posts", payload);
      set((state) => ({ posts: [data, ...state.posts], loading: false }));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create post";
      set({ error: message, loading: false });
      return null;
    }
  },

  updatePost: async (id: number, payload: Omit<Post, "id">) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put<Post>(`/posts/${id}`, payload);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? data : p)),
        currentPost: state.currentPost?.id === id ? data : state.currentPost,
        loading: false,
      }));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update post";
      set({ error: message, loading: false });
      return null;
    }
  },

  patchPost: async (id: number, payload: Partial<Omit<Post, "id">>) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch<Post>(`/posts/${id}`, payload);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? data : p)),
        currentPost: state.currentPost?.id === id ? data : state.currentPost,
        loading: false,
      }));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to patch post";
      set({ error: message, loading: false });
      return null;
    }
  },

  deletePost: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
        loading: false,
      }));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete post";
      set({ error: message, loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
