import type { Metadata } from "next";
import TestPageClient from "./test-page-client";
import { OG_IMAGE_PATH, SITE_NAME } from "../lib/seo";

export const metadata: Metadata = {
  title: "우리 진짜 찐친일까? | 친구 궁합 테스트",
  description:
    "생년월일만 넣으면 30초 만에 결과! 오행으로 보는 찐친 케미 점수, 지금 바로 확인해봐. 친한 줄 알았는데 점수 보고 멘붕 온 사람 많음.",
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
    title: "우리 진짜 찐친일까? | 친구 궁합 테스트",
    description:
      "생년월일만 넣으면 30초 만에 결과! 친한 줄 알았는데 점수 보고 멘붕 온 사람 많음.",
    url: "/test",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE_PATH],
  },
  twitter: {
    card: "summary_large_image",
    title: "우리 진짜 찐친일까? | 친구 궁합 테스트",
    description: "생년월일만 넣으면 30초 만에 결과! 친한 줄 알았는데 점수 보고 멘붕 온 사람 많음.",
    images: [OG_IMAGE_PATH],
  },
};

export default function TestPage() {
  return <TestPageClient />;
}
