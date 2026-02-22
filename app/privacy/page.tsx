import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 친구 케미 궁합",
  description:
    "친구 케미 궁합은 개인정보를 수집·저장하지 않습니다. 모든 계산은 브라우저 내에서 처리됩니다.",
};

const sections = [
  {
    title: "수집하는 개인정보",
    content:
      "친구 케미 궁합은 회원 가입이 없으며, 서비스 이용 시 입력하는 이름·생년월일 등 모든 데이터는 브라우저 내에서만 처리됩니다. 해당 정보는 서버로 전송되거나 데이터베이스에 저장되지 않습니다.",
  },
  {
    title: "쿠키 및 로컬 스토리지",
    content:
      "서비스는 필수 기능 이외의 쿠키를 사용하지 않습니다. 입력된 정보는 페이지 이동 시 URL 파라미터로만 전달되며, 브라우저를 닫으면 즉시 소멸됩니다.",
  },
  {
    title: "제3자 서비스",
    content:
      "서비스는 GitHub Pages를 통해 호스팅됩니다. GitHub의 서버 로그에는 방문자의 IP 주소, 브라우저 정보 등 일반적인 웹 액세스 로그가 기록될 수 있으며, 이는 GitHub의 개인정보처리방침에 따라 관리됩니다. 서비스는 별도의 광고 추적기나 분석 도구를 사용하지 않습니다.",
  },
  {
    title: "미성년자 보호",
    content:
      "본 서비스는 연령 제한 없이 이용 가능한 엔터테인먼트 콘텐츠이며, 만 14세 미만 어린이의 개인정보를 의도적으로 수집하지 않습니다.",
  },
  {
    title: "방침 변경",
    content:
      "개인정보처리방침이 변경될 경우 서비스 내 공지를 통해 안내합니다. 변경 후 계속 이용하시면 변경된 방침에 동의하신 것으로 간주합니다.",
  },
  {
    title: "문의",
    content:
      "개인정보 관련 문의는 아래 이메일로 연락해 주세요. 확인 후 신속하게 답변 드립니다.",
    email: true,
  },
];

export default function Privacy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-12">
      <Container>
        {/* 네비 */}
        <div className="form-nav">
          <Link href="/" className="form-back">←</Link>
          <span className="form-nav-title">개인정보처리방침</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">개인정보처리방침</h1>
        <p className="text-gray-500 text-sm mb-10">시행일: 2026년 1월 1일</p>

        <div className="space-y-5">
          {sections.map(({ title, content, email }) => (
            <div key={title} className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="font-semibold text-gray-900 mb-3">{title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              {email && (
                <a
                  href="mailto:decisionlab.platform@gmail.com"
                  className="inline-block mt-3 text-sm font-medium text-rose-500"
                  style={{ textDecoration: "none" }}
                >
                  decisionlab.platform@gmail.com
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
