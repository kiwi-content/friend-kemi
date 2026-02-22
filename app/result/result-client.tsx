"use client";

import Container from "../components/Container";
import Button from "../components/Button";
import ShareBar from "../components/ShareBar";
import { useRouter } from "next/navigation";

type Result = {
  title: string;
  summary: string;
  good: string[];
  conflict: string[];
  tips: string[];
  activity: string[];
  fortune: string;
  a: string;
  b: string;
};

export default function ResultClient({ result }: { result: Result }) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#F6F2FF] to-[#E9E6FF] py-20 overflow-hidden">
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-[#C4B5FD] rounded-full blur-[160px] opacity-25"></div>

      <Container>
        {/* Main */}
        <div
          id="share-card"
          className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl mb-14 text-center"
        >
          {/* puzzle badge */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#7C3AED] shadow-xl flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded-[8px] bg-[#9AE6B4]" />
              <div className="w-5 h-5 rounded-[8px] bg-[#C4B5FD]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#FF8BA7] bg-clip-text text-transparent mb-4">
            {result.title}
          </h1>

          <p className="text-gray-700 text-lg mb-4">{result.summary}</p>

          <div className="text-sm text-gray-400 tracking-wide">
            {result.a} × {result.b}
          </div>
        </div>

        <AdBlock />

        <Section title="잘 맞는 점 💞" items={result.good} />
        <Section title="갈등 포인트 ⚠️" items={result.conflict} />

        <AdBlock />

        <Section title="친해지는 팁 🌱" items={result.tips} />
        <Section title="같이 하면 좋은 활동 🎒" items={result.activity} />

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl mb-14 text-center">
          <h2 className="font-semibold text-[#7C3AED] mb-3 text-lg">
            한 줄 케미 운세 ✨
          </h2>
          <p className="text-gray-700">{result.fortune}</p>
        </div>

        <AdBlock />

        <ShareBar
          title={result.title}
          subtitle={`${result.a} × ${result.b}`}
        />

        <Button full onClick={() => router.push("/test")}>
          다시 테스트하기 🔁
        </Button>
      </Container>
    </section>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl mb-10 hover:shadow-2xl transition">
      <h2 className="font-semibold text-[#7C3AED] mb-4 text-lg">{title}</h2>
      <ul className="space-y-2 text-gray-700 list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AdBlock() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-12 text-center text-gray-400">
      광고 영역
    </div>
  );
}
