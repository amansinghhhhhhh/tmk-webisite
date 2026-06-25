const API_BASE = import.meta.env.VITE_API_BASE || "https://royalblue-penguin-565324.hostingersite.com/wp-json/wp/v2";

export async function fetchPosts(categoryId) {
  const res = await fetch(`${API_BASE}/posts?_embed&categories=${categoryId}&per_page=50`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPostBySlug(slug) {
  const res = await fetch(`${API_BASE}/posts?_embed&slug=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  console.log("RAW POST:", data[0]);
  return data[0] || null;
}

export async function fetchService(slug) {
  const res = await fetch(`${API_BASE}/service?slug=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  const data = await res.json();
  return data[0] || null;
}

export async function getMediaUrl(id) {
  if (!id) return "";
  try {
    const res = await fetch(`${API_BASE}/media/${id}`);
    if (!res.ok) return "";
    const data = await res.json();
    return data.source_url || "";
  } catch {
    return "";
  }
}

export function mapService(service) {
  return {
    id: service.id,
    title: service.title.rendered,
    slug: service.slug,
    link: service.link,
    acf: service.acf || {},
    seo: service.yoast_head_json || null,
  };
}

export function mapPost(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms = post._embedded?.["wp:term"]?.[0] || [];
  const category = terms.find((t) => t.taxonomy === "category");

  return {
    id: post.id,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    link: post.link,
    image: media?.source_url || "",
    categoryName: category?.name || "",
    categorySlug: category?.slug || "",
    seo: post.yoast_head_json || null,
  };
}
