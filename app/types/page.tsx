import type { Metadata } from "next";
import Container from "../components/Container";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "너는 어떤 케미 유형? | 친구 케미 궁합",
  description:
    "찐친 케미, 티키타카 케미, 극과 극 케미까지. 오행으로 보는 5가지 친구 케미 유형, 너는 어디에 해당될까?",
  alternates: {
    canonical: "/types",
  },
  openGraph: {
    title: `너는 어떤 케미 유형? | ${SITE_NAME}`,
    description:
      "찐친 케미, 티키타카 케미, 극과 극 케미까지. 오행으로 보는 5가지 친구 케미 유형 확인해봐.",
    url: "/types",
    siteName: SITE_NAME,
    locale: "ko_KR",
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
