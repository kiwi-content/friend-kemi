import Container from "../components/Container";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-6">개인정보처리방침</h1>
        <p className="text-gray-600">
          본 서비스는 입력 데이터를 저장하지 않으며, 개인 정보를 수집하지 않습니다.
        </p>
      </Container>
    </section>
  );
}
