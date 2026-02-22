"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F4F1FF] to-[#E6E3FF] flex flex-col items-center justify-center">

      {/* Massive Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#A78BFA] rounded-full blur-[180px] opacity-30"></div>

      {/* Floating Puzzle Layer */}
      <div className="relative mb-16">

        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#7C3AED] shadow-[0_40px_100px_rgba(124,58,237,0.5)] flex items-center justify-center">

          <div className="relative flex gap-4 translate-y-[-6px]">

            <div className="w-20 h-20 bg-[#9AE6B4] rounded-2xl shadow-xl translate-y-2"></div>

            <div className="w-20 h-20 bg-[#C4B5FD] rounded-2xl shadow-xl translate-y-[-6px]"></div>

          </div>

        </div>

      </div>

      {/* Title Layer */}
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#FF8BA7] bg-clip-text text-transparent mb-4">
        친구 케미 궁합
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        MBTI 기반으로 재미로 보는 친구 케미 테스트
      </p>

      {/* CTA */}
      <button
        onClick={() => router.push("/test")}
        className="px-10 py-4 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white font-semibold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
        테스트 시작하기
      </button>

      {/* Floating Preview Cards */}
      <div className="mt-20 w-full max-w-md relative">

        <div className="absolute top-6 left-6 right-6 bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl rotate-[-2deg]">
          <h3 className="font-semibold text-[#7C3AED]">
            영혼의 찐친 케미
          </h3>
          <p className="text-sm text-gray-600">
            성향이 거의 동일한 안정형 조합
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-6 shadow-2xl rotate-[2deg]">
          <h3 className="font-semibold text-[#7C3AED]">
            극과 극 자극 케미
          </h3>
          <p className="text-sm text-gray-600">
            완전히 다르지만 강한 자극을 주는 조합
          </p>
        </div>

      </div>

    </section>
  );
}
