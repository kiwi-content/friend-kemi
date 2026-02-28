import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../components/Container";
import { blogPosts, getBlogPostBySlug } from "../../data/blog-posts";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "../../lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${post.title} | 친구 관계 꿀팁`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [OG_IMAGE_PATH],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      images: [OG_IMAGE_PATH],
    },
  };
}

const categoryLabel: Record<(typeof blogPosts)[number]["category"], string> = {
  신학기: "신학기 적응",
  갈등해결: "갈등 해결",
  대화법: "대화 스킬",
};

const categoryEmoji: Record<(typeof blogPosts)[number]["category"], string> = {
  신학기: "🌸",
  갈등해결: "🧩",
  대화법: "💬",
};

const sectionEmoji = ["🌷", "✨", "🍀", "🫶", "💡", "🎀"] as const;
const paragraphEmoji = ["💬", "🌼", "✨", "🍀"] as const;

const flowMoodByCategory: Record<
  (typeof blogPosts)[number]["category"],
  { caption: string; trail: string }[]
> = {
  신학기: [
    { caption: "처음엔 어색하고 긴장돼도", trail: "😳 → 🙋‍♀️ → 🙂" },
    { caption: "짧은 대화가 쌓이면", trail: "🙂 → 👭 → 🌸" },
  ],
  갈등해결: [
    { caption: "속상한 마음에서", trail: "🤦‍♀️ → 🗣️ → 👂" },
    { caption: "대화가 되면", trail: "😮‍💨 → 🤝 → 🙂" },
  ],
  대화법: [
    { caption: "말문이 막혀도", trail: "🤐 → 🙋‍♀️ → 😊" },
    { caption: "톤을 맞추면", trail: "🧍‍♀️ → 🗨️ → 🫶" },
  ],
};

const stepTitleByCategory: Record<
  (typeof blogPosts)[number]["category"],
  string[]
> = {
  신학기: ["마음 풀기 단계", "첫 연결 만들기 단계", "관계 다지기 단계"],
  갈등해결: ["감정 정리 단계", "대화 풀기 단계", "관계 회복 단계"],
  대화법: ["말문 열기 단계", "표현 조절 단계", "관계 확장 단계"],
};

function getStepTitle(
  category: (typeof blogPosts)[number]["category"],
  sectionIndex: number,
  totalSections: number
) {
  const titles = stepTitleByCategory[category];

  if (totalSections <= 1) {
    return titles[0] || "핵심 단계";
  }

  if (sectionIndex >= totalSections - 1) {
    return titles[2] || "마무리 단계";
  }

  return titles[sectionIndex] || "다음으로 이어지는 단계";
}

function getEmpathyLead(category: (typeof blogPosts)[number]["category"]) {
  if (category === "신학기") {
    return "새 반에서 작은 일도 크게 느껴지는 시기라 더 마음이 흔들릴 수 있어.";
  }

  if (category === "갈등해결") {
    return "친한 사이일수록 오해나 갈등이 생기면 더 속상하고 마음이 복잡해지기 쉬워.";
  }

  return "말 한마디가 유난히 어렵게 느껴지는 날이 누구에게나 있어.";
}

function getCtaVariant(slug: string) {
  const score = Array.from(slug).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0
  );
  return score % 2 === 0 ? "A" : "B";
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);
  const empathyLead = getEmpathyLead(post.category);
  const ctaVariant = getCtaVariant(post.slug);
  const ctaCopy =
    ctaVariant === "A"
      ? {
          title: post.ctaTitle,
          description: post.ctaDescription,
          button: "친구 케미 테스트 시작하기",
        }
      : {
          title: "지금 우리 사이, 어떤 케미인지 바로 체크해볼래",
          description:
            "30초 테스트로 상생 포인트와 갈등 포인트를 같이 보고 대화를 더 편하게 시작해보자.",
          button: "30초 케미 테스트 하러 가기",
        };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    articleSection: post.category,
    description: post.description,
    keywords: post.keywords.join(", "),
    inLanguage: "ko-KR",
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#FFFDF8] to-[#FCEFF6] py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <div className="form-nav">
          <Link href="/blog" className="form-back">
            ←
          </Link>
          <span className="form-nav-title">친구 관계 꿀팁</span>
        </div>

        <header className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <p className="text-xs font-semibold mb-2" style={{ color: "#b46087" }}>
            {categoryEmoji[post.category]} {categoryLabel[post.category]}
          </p>
          <h1 className="text-2xl font-bold leading-snug mb-3">{post.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            🫶 {empathyLead} {post.description}
          </p>
          <p className="text-xs text-gray-400 mb-4">
            {post.publishedAt} · {post.readTimeMinutes}분 읽기
          </p>

          <div className="rounded-2xl p-4" style={{ background: "#fff5fa", border: "1px solid #f4d6e6" }}>
            <p className="text-sm font-semibold text-gray-800 mb-1">💭 지금 고민</p>
            <p className="text-sm text-gray-700">{post.concern}</p>
          </div>
        </header>

        <div className="mb-4 px-1">
          <p className="text-xs text-gray-500">
            🙋‍♀️ 너무 고민 고민하지마! 팔로팔로 미
          </p>
        </div>

        <div className="space-y-0">
          {post.sections.map((section, sectionIndex) => {
            const isLast = sectionIndex === post.sections.length - 1;
            const nextSection = !isLast ? post.sections[sectionIndex + 1] : null;

            return (
              <div key={section.heading}>
                <section className="bg-white rounded-3xl p-6 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ background: "#fff2f8", color: "#b46087" }}
                    >
                      STEP {sectionIndex + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getStepTitle(post.category, sectionIndex, post.sections.length)}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold mb-3">
                    {sectionEmoji[sectionIndex % sectionEmoji.length]} {section.heading}
                  </h2>
                  <div className="space-y-3 mb-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-sm text-gray-700 leading-relaxed">
                        {paragraphIndex > 0 && (
                          <span>
                            {paragraphEmoji[(sectionIndex + paragraphIndex) % paragraphEmoji.length]}{" "}
                          </span>
                        )}
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">✅ 바로 해볼 체크리스트</p>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      {section.checklist.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                {!isLast && nextSection && (
                  <div className="flex flex-col items-center py-3">
                    <span className="text-[11px] text-gray-500 mb-1">
                      {
                        flowMoodByCategory[post.category][
                          sectionIndex % flowMoodByCategory[post.category].length
                        ].caption
                      }
                    </span>
                    <span className="text-xl">
                      {
                        flowMoodByCategory[post.category][
                          sectionIndex % flowMoodByCategory[post.category].length
                        ].trail
                      }
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <section className="bg-white rounded-3xl p-6 shadow-lg mt-7 text-center">
          <h2 className="text-lg font-bold mb-2">💖 {ctaCopy.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{ctaCopy.description}</p>
          <Link
            href="/test"
            className="inline-block px-6 py-3 rounded-full text-white font-bold text-sm"
            data-cta-variant={ctaVariant}
            style={{ background: "var(--rose)", textDecoration: "none" }}
          >
            {ctaCopy.button}
          </Link>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-8">
            <h3 className="text-base font-bold mb-3">📚 같이 읽으면 좋은 글</h3>
            <div className="space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-white rounded-2xl p-4 shadow-sm"
                  style={{ textDecoration: "none" }}
                >
                  <p className="text-xs text-gray-400 mb-1">
                    {categoryEmoji[related.category]} {categoryLabel[related.category]}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{related.title}</p>
                  <p className="text-xs text-gray-600">{related.concern}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="text-center mt-8">
          <Link href="/blog" className="text-sm" style={{ color: "#8b4a67" }}>
            ← 블로그 목록으로 돌아가기
          </Link>
        </div>
      </Container>
    </article>
  );
}
