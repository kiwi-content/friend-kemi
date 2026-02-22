import Container from "../components/Container";

export default function TypesPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-10 text-center">
          케미 유형 소개
        </h1>

        <TypeCard title="영혼의 찐친 케미" />
        <TypeCard title="티키타카 찐친 케미" />
        <TypeCard title="밸런스 성장형 케미" />
        <TypeCard title="극과 극 자극 케미" />
        <TypeCard title="예측불가 매력 케미" />
      </Container>
    </section>
  );
}

function TypeCard({ title }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <h2 className="font-semibold text-[#7C3AED] mb-2">{title}</h2>
      <p className="text-gray-600">
        해당 유형은 사주 오행 조합에 따라 분류됩니다.
      </p>
    </div>
  );
}
