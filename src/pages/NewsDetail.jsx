import PostDetail from "../components/PostDetail"

export default function NewsDetail() {
  return (
    <PostDetail
      categoryId={3}
      backLink="/news"
      backLabel="Back to News"
      listLink="/news"
      listLabel="View All News"
      routePrefix="news"
    />
  )
}
