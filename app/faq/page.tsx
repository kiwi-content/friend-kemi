import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 친구 케미 궁합",
  description:
    "사주 오행 기반 친구 궁합 테스트에 대한 자주 묻는 질문 모음. 오행 유형 결정 방법, 상생·상극 의미, 결과 활용법까지 한 번에 확인하세요.",
  keywords: [
    "친구 궁합 FAQ",
    "오행 궁합 질문",
    "사주 오행 설명",
    "상생 상극 뜻",
    "목화토금수",
    "친구 케미 테스트 방법",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `자주 묻는 질문 | ${SITE_NAME}`,
    description:
      "친구 궁합 테스트 이용 전에 자주 묻는 질문과 오행 해석 기준을 확인해보세요.",
    url: "/faq",
    type: "article",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: `자주 묻는 질문 | ${SITE_NAME}`,
    description: "오행 궁합 테스트 FAQ를 한 번에 확인하세요.",
    images: [OG_IMAGE_PATH],
  },
};

const faqs = [
  {
    q: "친구 케미 궁합은 어떤 테스트인가요?",
    a: "생년월일을 입력하면 사주(四柱)의 천간(天干)에서 오행(목·화·토·금·수) 유형을 계산하고, 두 사람의 오행 관계로 궁합 점수와 유형을 분석해주는 테스트예요. 조별과제 파트너부터 찐친 사이까지 다양한 관계에서 활용할 수 있어요.",
  },
  {
    q: "오행(五行)이란 무엇인가요?",
    a: "오행은 동양 철학에서 세상 만물을 이루는 다섯 가지 기운 — 목(木)·화(火)·토(土)·금(金)·수(水) — 을 말해요. 나무·불·흙·쇠·물의 성질을 사람의 성격과 관계에 대입해 궁합을 보는 전통적인 방법이에요.",
  },
  {
    q: "내 오행 유형은 어떻게 결정되나요?",
    a: "태어난 해의 마지막 숫자(천간)로 결정돼요. 예를 들어 2004년생은 '갑(甲)'에 해당해 목(木) 유형, 2006년생은 '병(丙)'에 해당해 화(火) 유형이에요. 같은 해에 태어났다면 오행 유형이 같게 나와요.",
  },
  {
    q: "상생(相生), 비화(比和), 상극(相剋)은 무슨 뜻인가요?",
    a: "상생은 서로 에너지를 북돋아 주는 관계예요. 예를 들어 목(나무)이 화(불)을 키우는 것처럼 자연스럽게 조화를 이루죠. 비화는 같은 오행끼리 만나는 관계로 공감대가 강해 편안한 사이가 돼요. 상극은 에너지가 충돌해 갈등이 생기기 쉽지만, 그만큼 자극을 주고받으며 성장하는 관계예요.",
  },
  {
    q: "MBTI 궁합 테스트와 다른 점이 뭔가요?",
    a: "MBTI는 성격 유형 검사를 통해 16가지 유형을 스스로 분류하는 방식이에요. 반면 이 테스트는 태어난 해에서 자동으로 오행 유형을 계산하기 때문에 별도 설문 없이 생년월일만 입력하면 돼요. 두 방식은 서로 보완적으로 활용하면 좋아요.",
  },
  {
    q: "태어난 해가 같으면 결과도 같나요?",
    a: "네. 사주 오행은 태어난 해의 천간으로 결정되기 때문에, 같은 해 출생이면 같은 오행 유형이 나와요. 같은 오행끼리는 '비화' 관계로 결과가 나와요.",
  },
  {
    q: "상극 결과가 나왔는데 우린 친해질 수 없는 건가요?",
    a: "아니에요! 상극은 단순히 '에너지가 다르다'는 뜻이에요. 오히려 서로 자극을 주며 성장하는 케미가 될 수 있어요. 결과 페이지의 '친해지는 팁'을 참고하면 갈등을 줄이고 좋은 관계를 만들 수 있어요.",
  },
  {
    q: "친구 궁합 테스트 결과를 공유하려면 어떻게 하나요?",
    a: "결과 페이지 하단의 '결과 공유하기' 버튼을 누르면 돼요. 카카오톡·인스타그램 등으로 결과 링크를 바로 공유할 수 있어요. 모바일 기기에서는 공유 시트가 열리고, PC에서는 링크가 클립보드에 복사돼요.",
  },
  {
    q: "친구 케미 궁합은 정확한가요?",
    a: "본 테스트는 전통 오행 이론을 바탕으로 한 엔터테인먼트 목적의 콘텐츠예요. 실제 관계를 단정 짓지 않으며, 재미있는 대화 소재나 관계 힌트로 가볍게 즐겨주세요.",
  },
  {
    q: "입력한 생년월일은 저장되나요?",
    a: "아니요. 입력 데이터는 서버에 전송되거나 저장되지 않아요. 모든 계산은 브라우저 내에서만 이루어지며, 페이지를 닫으면 데이터가 사라져요.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        {/* 네비 */}
        <div className="form-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">자주 묻는 질문</span>
        </div>

        <h1 className="text-3xl font-bold mb-10 text-center">
          자주 묻는 질문 (FAQ)
        </h1>

        <div className="space-y-8">
          {faqs.map(({ q, a }) => (
            <QA key={q} q={q} a={a} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h2 className="font-semibold mb-3">{q}</h2>
      <p className="text-gray-600">{a}</p>
    </div>
  );
}
