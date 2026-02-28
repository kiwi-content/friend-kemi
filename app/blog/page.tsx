import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import { BLOG_CATEGORIES, blogPosts } from "../data/blog-posts";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "../lib/seo";
import BlogListClient from "./blog-list-client";

const sortedPosts = [...blogPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

const categoryDisplay: Record<(typeof BLOG_CATEGORIES)[number], string> = {
  신학기: "신학기 적응",
  갈등해결: "갈등 해결",
  대화법: "대화 스킬",
};

const categoryEmoji: Record<(typeof BLOG_CATEGORIES)[number], string> = {
  신학기: "🌸",
  갈등해결: "🧩",
  대화법: "💬",
};

export const metadata: Metadata = {
  title: "친구 관계 꿀팁 블로그 | 친구 케미 궁합",
  description:
    "신학기 친구 사귀는 법, 친구 갈등 해결, 대화법까지. 고등학생도 바로 써먹을 수 있는 친구 관계 실전 가이드를 모았어요.",
  keywords: [
    "신학기 친구 사귀는 법",
    "친구 갈등 해결",
    "고등학생 인간관계",
    "친구 대화법",
    "학교 생활 팁",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `친구 관계 꿀팁 블로그 | ${SITE_NAME}`,
    description:
      "신학기 친구 사귀기부터 갈등 해결까지, 학교에서 바로 쓸 수 있는 관계 가이드.",
    url: "/blog",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: `친구 관계 꿀팁 블로그 | ${SITE_NAME}`,
    description: "친구 고민별 실전 해결 가이드를 모아봤어요.",
    images: [OG_IMAGE_PATH],
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "친구 관계 꿀팁 블로그",
    description:
      "신학기 친구 사귀기, 갈등 해결, 대화법을 다루는 고등학생 대상 친구 관계 가이드",
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/blog/${post.slug}`,
      description: post.description,
    })),
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF9F5] to-[#FDECF3] py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="form-nav">
          <Link href="/" className="form-back">
            ←
          </Link>
          <span className="form-nav-title">친구 관계 꿀팁 🌷</span>
        </div>

        <h1 className="text-3xl font-bold mb-3">친구 고민 해결 블로그 ✍️</h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          신학기 친구 만들기부터 갈등 해결까지, 지금 고민에 바로 써먹을 수 있는 글을
          모았어. 총 {sortedPosts.length}개 주제로 정리했어 💖
        </p>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{
            color: "#8b4a67",
            background: "#fff7fb",
            border: "1px solid #f4d6e6",
            borderRadius: "16px",
            padding: "0.9rem 1rem",
          }}
        >
          🫶 요즘 친구 문제로 마음이 복잡했다면, 우선 그 마음부터 너무 자연스럽다는 말
          해주고 싶어. 여기 글들은 너를 탓하려고 만든 게 아니라, 덜 지치게 도와주려고
          만들었어.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {BLOG_CATEGORIES.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #f1d7e5",
                color: "#8b4a67",
              }}
            >
              {categoryEmoji[category]} {categoryDisplay[category]} · {
                sortedPosts.filter((post) => post.category === category).length
              }
            </span>
          ))}
        </div>

        <BlogListClient posts={sortedPosts} />

        <div className="bg-white rounded-3xl p-6 shadow-lg mt-10 text-center">
          <p className="text-sm text-gray-600 mb-3">글 읽고 바로 우리 관계에도 적용해보자 ✨</p>
          <Link
            href="/test"
            className="inline-block px-6 py-3 rounded-full text-white font-bold text-sm"
            style={{ background: "var(--rose)", textDecoration: "none" }}
          >
            친구 케미 테스트하러 가기 🫶
          </Link>
        </div>
      </Container>
    </section>
  );
}
