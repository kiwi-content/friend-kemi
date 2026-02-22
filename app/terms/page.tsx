import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";

export const metadata: Metadata = {
  title: "이용약관 | 친구 케미 궁합",
  description:
    "친구 케미 궁합 서비스 이용약관입니다. 서비스 목적, 이용 조건, 면책 조항 등을 안내합니다.",
};

const sections = [
  {
    title: "제1조 서비스 목적",
    content:
      "친구 케미 궁합(이하 '서비스')은 전통 사주 오행 이론을 바탕으로 두 사람 사이의 궁합 유형을 분석해 제공하는 엔터테인먼트 목적의 웹 서비스입니다. 본 서비스의 결과는 오락 및 참고 용도로만 활용되어야 하며, 실제 관계나 의사결정의 근거로 삼아서는 안 됩니다.",
  },
  {
    title: "제2조 이용 조건",
    content:
      "서비스는 누구나 회원 가입 없이 무료로 이용할 수 있습니다. 이용자는 서비스를 개인적·비상업적 목적으로만 이용해야 하며, 서비스의 콘텐츠를 무단으로 복제·배포·수정하여 상업적으로 활용하는 행위는 금지됩니다.",
  },
  {
    title: "제3조 서비스 변경 및 중단",
    content:
      "운영자는 서비스의 내용·기능을 사전 고지 없이 변경하거나 일시 중단할 수 있습니다. 서비스 중단으로 인한 손해에 대해 운영자는 책임을 지지 않습니다.",
  },
  {
    title: "제4조 면책 조항",
    content:
      "본 서비스의 분석 결과는 전통 오행 이론을 참고한 엔터테인먼트 콘텐츠이며, 과학적·통계적 근거를 보장하지 않습니다. 서비스 이용으로 발생한 직·간접적 손해에 대해 운영자는 법적 책임을 지지 않습니다.",
  },
  {
    title: "제5조 저작권",
    content:
      "서비스 내 텍스트·디자인·코드 등 모든 콘텐츠의 저작권은 운영자에게 있습니다. 이용자가 생성·공유한 결과 이미지는 개인 SNS 등 비상업적 용도로 자유롭게 사용할 수 있습니다.",
  },
  {
    title: "제6조 약관 변경",
    content:
      "운영자는 필요 시 이 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 게시 시점부터 효력이 발생합니다. 변경 후에도 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주합니다.",
  },
];

export default function Terms() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-12">
      <Container>
        {/* 네비 */}
        <div className="form-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">이용약관</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">이용약관</h1>
        <p className="text-gray-500 text-sm mb-10">시행일: 2026년 1월 1일</p>

        <div className="space-y-5">
          {sections.map(({ title, content }) => (
            <div key={title} className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="font-semibold text-gray-900 mb-3">{title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          문의:{" "}
          <a href="mailto:decisionlab.platform@gmail.com" className="underline">
            decisionlab.platform@gmail.com
          </a>
        </p>
      </Container>
    </section>
  );
}
