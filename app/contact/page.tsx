import Container from "../components/Container";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-6">문의</h1>
        <p className="text-gray-600">
          문의 사항은 추후 이메일로 제공될 예정입니다.
        </p>
      </Container>
    </section>
  );
}
