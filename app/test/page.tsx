import type { Metadata } from "next";
import TestPageClient from "./test-page-client";
import { OG_IMAGE_PATH } from "../lib/seo";

export const metadata: Metadata = {
  title: "친구 궁합 테스트 시작 | 친구 케미 궁합",
  description:
    "두 사람의 생년월일로 오행 유형을 계산해 친구 궁합을 확인해보세요. 가입 없이 30초 만에 케미 점수와 관계 해석을 볼 수 있어요.",
  keywords: [
    "친구 궁합 테스트",
    "오행 궁합 테스트",
    "생년월일 궁합",
    "친구 케미 테스트",
    "사주 오행 친구 궁합",
  ],
  alternates: {
    canonical: "/test",
  },
  openGraph: {
    title: "친구 궁합 테스트 시작",
    description:
      "생년월일 입력 후 30초 만에 친구 케미 점수와 궁합 해석을 확인해보세요.",
    url: "/test",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: "친구 궁합 테스트 시작",
    description: "오행 기반 친구 궁합을 지금 바로 확인해보세요.",
    images: [OG_IMAGE_PATH],
  },
};

export default function TestPage() {
  return <TestPageClient />;
}
