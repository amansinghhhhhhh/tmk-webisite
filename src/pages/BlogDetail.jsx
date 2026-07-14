import PostDetail from "../components/PostDetail"

export default function BlogDetail() {
  return (
    <PostDetail
      categoryId={4}
      backLink="/blogs"
      backLabel="Back to Blog"
      listLink="/blogs"
      listLabel="View All Blogs"
      routePrefix="blog"
    />
  )
}
