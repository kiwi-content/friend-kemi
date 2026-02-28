import "./globals.css";
import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} 💜 두근두근 스쿨 케미`,
  description: SITE_DESCRIPTION,
  keywords: [
    "친구 궁합",
    "친구 궁합 테스트",
    "사주 오행 궁합",
    "오행 궁합 테스트",
    "친구 케미",
    "케미 테스트",
    "신학기 궁합",
    "학교 친구 궁합",
    "무료 궁합 테스트",
    "생년월일 궁합",
    "찐친 궁합",
    "목화토금수 궁합",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} 💜`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: "/",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} 💜`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "qRhK_TW2QITIO35Vcuf1N_jHEcgQBd9cGtk42YXvdNo",
    other: {
      "naver-site-verification": "28e2d114cdf4a1e9c1cdb2b84bc439cb366e1a4b",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
