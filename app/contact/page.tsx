import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "문의하기 | 친구 케미 궁합",
  description:
    "친구 케미 궁합 서비스 관련 문의, 오류 신고, 콘텐츠 제안은 이메일로 보내주세요. 빠르게 답변 드립니다.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `문의하기 | ${SITE_NAME}`,
    description: "서비스 문의, 오류 신고, 콘텐츠 제안을 이메일로 보내주세요.",
    url: "/contact",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
};

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-12">
      <Container>
        {/* 네비 */}
        <div className="form-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">문의하기</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">문의하기</h1>
        <p className="text-gray-500 mb-10 text-sm">궁금한 점이 있으면 편하게 이메일로 보내주세요.</p>

        {/* 이메일 카드 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">이메일</p>
          <a
            href="mailto:decisionlab.platform@gmail.com"
            className="text-lg font-semibold text-rose-500 break-all"
            style={{ textDecoration: "none" }}
          >
            decisionlab.platform@gmail.com
          </a>
          <p className="text-gray-500 text-sm mt-2">평일 기준 1~3일 내 답변 드립니다.</p>
        </div>

        {/* 문의 유형 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <p className="text-sm font-semibold mb-4">이런 문의를 받아요</p>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              { emoji: "🐛", label: "서비스 오류 신고", desc: "결과가 안 나와요, 버튼이 작동 안 해요 등" },
              { emoji: "💡", label: "콘텐츠 제안", desc: "새로운 오행 조합 설명 추가 요청" },
              { emoji: "🤝", label: "광고 · 협업 문의", desc: "제휴, 콘텐츠 협업 등" },
              { emoji: "📬", label: "기타 문의", desc: "그 외 모든 문의 환영해요" },
            ].map(({ emoji, label, desc }) => (
              <li key={label} className="flex gap-3 items-start">
                <span className="text-lg">{emoji}</span>
                <div>
                  <p className="font-medium text-gray-800">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 이메일 제목 팁 */}
        <div className="bg-rose-50 rounded-3xl p-5 text-sm text-rose-700">
          <p className="font-semibold mb-1">💌 이메일 제목 형식을 맞춰주시면 빨라요</p>
          <p className="text-rose-600 font-mono text-xs mt-2">[문의유형] 내용 — 예: [오류신고] 결과 페이지 접속 안 됨</p>
        </div>
      </Container>
    </section>
  );
}
