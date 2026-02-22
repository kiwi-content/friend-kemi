import "./globals.css";

export const metadata = {
  title: "친구 케미 궁합 💜 두근두근 스쿨 케미",
  description:
    "사주 오행으로 알아보는 찐친 궁합 테스트. 조별과제부터 찐친까지, 우리 사이 진짜 케미를 확인해봐!",
  openGraph: {
    title: "친구 케미 궁합 💜",
    description: "사주 오행 기반 친구 궁합 테스트",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    naver: "28e2d114cdf4a1e9c1cdb2b84bc439cb366e1a4b",
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
