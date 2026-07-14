import { useState, useEffect } from "react";
import { fetchPosts, mapPost } from "../api/wordpress";

const POSTS_PER_PAGE = 6;

export default function useLoadMorePosts(categoryId) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInitialPosts() {
      try {
        setLoading(true);
        setError(null); // Clear previous errors on category change

        const { posts: initialPosts, totalPages: total } = await fetchPosts(
          categoryId,
          1,
          POSTS_PER_PAGE
        );

        setPosts(initialPosts.map(mapPost));
        setTotalPages(total);
        setPage(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadInitialPosts();
  }, [categoryId]); // Correctly wrapped inside the hook function now

  async function loadMore() {
    if (loadingMore || page >= totalPages) return;

    try {
      setLoadingMore(true);
      setError(null); 

      const nextPage = page + 1;
      const { posts: newPosts } = await fetchPosts(
        categoryId,
        nextPage,
        POSTS_PER_PAGE
      );

      setPosts(prev => [...prev, ...newPosts.map(mapPost)]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }

  return {
    posts,
    loading,
    loadingMore,
    error,
    hasMore: page < totalPages,
    loadMore,
  };
}