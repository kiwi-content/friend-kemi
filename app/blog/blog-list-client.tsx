"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogCategory, BlogPost } from "../data/blog-posts";

type FilterCategory = "전체" | BlogCategory;

const categoryLabel: Record<FilterCategory, string> = {
  전체: "전체",
  신학기: "신학기 적응",
  갈등해결: "갈등 해결",
  대화법: "대화 스킬",
};

const categoryEmoji: Record<FilterCategory, string> = {
  전체: "📚",
  신학기: "🌸",
  갈등해결: "🧩",
  대화법: "💬",
};

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("전체");

  const featuredPosts = useMemo(() => {
    const featured = posts.filter((post) => post.featured);
    return (featured.length > 0 ? featured : posts).slice(0, 4);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "전체" || post.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystacks = [
        post.title,
        post.concern,
        post.description,
        post.category,
        ...post.keywords,
      ];

      return haystacks.some((text) => text.toLowerCase().includes(normalizedQuery));
    });
  }, [posts, query, selectedCategory]);

  return (
    <>
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">✨ 인기 글</h2>

        <div className="space-y-3">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl p-5 shadow-md"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #fff6fb 100%)",
                textDecoration: "none",
                border: "1px solid #f4d6e6",
              }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#b46087" }}>
                {categoryEmoji[post.category]} {categoryLabel[post.category]}
              </p>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-700 mb-2">💭 고민: {post.concern}</p>
              <p className="text-xs text-gray-500">{post.readTimeMinutes}분 읽기</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-3xl p-5 shadow-md mb-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">🔍 고민 검색/필터</h2>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="예: 읽씹, 전학, 조별과제, 화해 💬"
          className="w-full rounded-xl px-4 py-2.5 text-sm"
          style={{
            border: "1px solid #f0d8e7",
            background: "#fffafc",
            outline: "none",
          }}
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {(["전체", "신학기", "갈등해결", "대화법"] as const).map((category) => {
            const active = selectedCategory === category;
            const count =
              category === "전체"
                ? posts.length
                : posts.filter((post) => post.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  border: active ? "1px solid #c95b8f" : "1px solid #f1d7e5",
                  color: active ? "#ffffff" : "#8b4a67",
                  background: active ? "#d45b93" : "#ffffff",
                }}
              >
                {categoryEmoji[category]} {categoryLabel[category]} · {count}
              </button>
            );
          })}
        </div>

        {(query || selectedCategory !== "전체") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("전체");
            }}
            className="mt-3 text-xs"
            style={{ color: "#8b4a67" }}
          >
            필터 초기화
          </button>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">📚 전체 글</h2>

        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-3xl p-5 shadow-md"
                style={{ textDecoration: "none" }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: "#b46087" }}>
                  {categoryEmoji[post.category]} {categoryLabel[post.category]}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-700 mb-2">💭 고민: {post.concern}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.description}</p>
                <p className="text-xs text-gray-400">
                  {post.publishedAt} · {post.readTimeMinutes}분 읽기
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-md text-center">
            <p className="text-sm text-gray-700 mb-2">찾는 고민이 아직 없네 🥺</p>
            <p className="text-xs text-gray-500">다른 키워드로 검색하거나 카테고리를 바꿔봐.</p>
          </div>
        )}
      </section>
    </>
  );
}
