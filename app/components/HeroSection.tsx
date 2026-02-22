import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/hero-clover-bg.webp"
        alt="신학기 친구 케미 궁합 클로버 배경"
        fill
        priority
        className="object-cover"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          신학기 친구 케미 궁합
        </h1>

        <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-xl">
          사주 오행으로 보는 우리 사이 케미<br />
          재미로 보는 친구 궁합 테스트
        </p>

        <Link href="/test">
          <button className="px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:opacity-90 transition">
            친구랑 케미 확인하기
          </button>
        </Link>

      </div>
    </section>
  );
}
