import type { Metadata } from "next";
import ResultQueryClient from "./result-query-client";

export const metadata: Metadata = {
  title: "친구 케미 결과",
  description: "입력한 친구 정보로 생성된 개인화 케미 결과 페이지입니다.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function ResultPage() {
  return <ResultQueryClient />;
}
