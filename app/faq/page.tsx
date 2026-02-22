import Container from "../components/Container";

export default function FAQ() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F3FF] to-[#E0E7FF] py-16">
      <Container>
        <h1 className="text-3xl font-bold mb-10 text-center">
          자주 묻는 질문 (FAQ)
        </h1>

        <div className="space-y-8">
          <QA
            q="친구 케미 궁합은 정확한가요?"
            a="본 테스트는 엔터테인먼트 목적의 콘텐츠이며 실제 관계를 단정하지 않습니다."
          />
          <QA
            q="태어난 해가 같으면 결과도 같나요?"
            a="네. 사주 오행은 태어난 해의 천간으로 결정되기 때문에, 같은 해 출생이면 같은 오행 유형이 나와요."
          />
          <QA
            q="입력 정보는 저장되나요?"
            a="아니요. 입력 데이터는 서버에 저장되지 않습니다."
          />
        </div>
      </Container>
    </section>
  );
}

function QA({ q, a }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h2 className="font-semibold mb-3">{q}</h2>
      <p className="text-gray-600">{a}</p>
    </div>
  );
}
