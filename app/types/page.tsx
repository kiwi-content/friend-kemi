import type { Metadata } from "next";
import Container from "../components/Container";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "케미 유형 소개 | 친구 케미 궁합",
  description:
    "사주 오행 조합으로 분류된 친구 케미 유형을 살펴보고 나와 친구의 관계 스타일을 이해해보세요.",
  alternates: {
    canonical: "/types",
  },
  openGraph: {
    title: `케미 유형 소개 | ${SITE_NAME}`,
    description: "오행 기반 친구 케미 유형을 한눈에 확인해보세요.",
    url: "/types",
    type: "article",
    images: [OG_IMAGE_PATH],
  },
};

export default function TypesPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-10 text-center">
          케미 유형 소개
        </h1>

        <TypeCard title="영혼의 찐친 케미" />
        <TypeCard title="티키타카 찐친 케미" />
        <TypeCard title="밸런스 성장형 케미" />
        <TypeCard title="극과 극 자극 케미" />
        <TypeCard title="예측불가 매력 케미" />
      </Container>
    </section>
  );
}

function TypeCard({ title }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <h2 className="font-semibold text-[#7C3AED] mb-2">{title}</h2>
      <p className="text-gray-600">
        해당 유형은 사주 오행 조합에 따라 분류됩니다.
      </p>
    </div>
  );
}
