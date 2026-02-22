import Container from "../components/Container";

export default function Terms() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-6">이용약관</h1>
        <p className="text-gray-600">
          본 서비스는 엔터테인먼트 목적의 테스트입니다.
        </p>
      </Container>
    </section>
  );
}
