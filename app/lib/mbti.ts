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

function compatibilityScore(a: string, b: string) {
  let score = 0;
  for (let i = 0; i < 4; i++) if (a[i] === b[i]) score += 1;
  return score;
}

export function getChemistryType(aRaw: string, bRaw: string): Result {
  const a = (aRaw || "").toUpperCase();
  const b = (bRaw || "").toUpperCase();

  if (!isMbti(a) || !isMbti(b)) {
    return strongMatch(a || "MBTI", b || "MBTI");
  }

  const score = compatibilityScore(a, b);

  if (score === 4) return perfectMatch(a, b);
  if (score === 3) return strongMatch(a, b);
  if (score === 2) return balancedMatch(a, b);
  if (score === 1) return growthMatch(a, b);
  return oppositeMatch(a, b);
}

function isMbti(x: string) {
  return (
    x.length === 4 &&
    "EI".includes(x[0]) &&
    "NS".includes(x[1]) &&
    "TF".includes(x[2]) &&
    "JP".includes(x[3])
  );
}

function perfectMatch(a: string, b: string): Result {
  return {
    title: "영혼의 찐친 케미",
    summary: "성향이 거의 동일해 깊은 공감과 안정감을 주는 조합이에요.",
    good: ["말 안 해도 통하는 느낌", "갈등이 오래가지 않음", "오래 유지되는 안정형 관계"],
    conflict: ["새로운 자극이 부족할 수 있음", "변화에 둔감해질 수 있음"],
    tips: ["함께 새로운 도전 시도하기", "가끔 역할 바꿔보기", "외부 활동 늘리기"],
    activity: ["스터디 메이트", "여행 계획 공유", "운동 루틴 같이 만들기", "장기 프로젝트", "취미 심화 활동"],
    fortune: "가장 오래 가는 우정 확률 높은 조합 💜",
    a,
    b,
  };
}

function strongMatch(a: string, b: string): Result {
  return {
    title: "티키타카 찐친 케미",
    summary: "대부분의 리듬이 잘 맞아 자연스럽게 이어지는 조합이에요.",
    good: ["대화 템포가 자연스럽다", "비슷한 가치관", "같이 있으면 편안함"],
    conflict: ["사소한 차이에 예민해질 수 있음", "비슷해서 더 부딪힐 수 있음"],
    tips: ["작은 차이를 인정하기", "감정은 바로 표현하기", "칭찬을 아끼지 않기"],
    activity: ["카페 탐방", "밤 산책", "콘텐츠 몰아보기", "공동 취미", "단기 여행"],
    fortune: "자연스럽게 오래 가는 안정형 조합 ✨",
    a,
    b,
  };
}

function balancedMatch(a: string, b: string): Result {
  return {
    title: "밸런스 성장형 케미",
    summary: "비슷한 부분과 다른 부분이 균형 잡힌 조합이에요.",
    good: ["서로 보완 가능", "대화 주제가 다양함", "함께 성장 가능"],
    conflict: ["관점 차이", "의사결정 방식 차이"],
    tips: ["중간 지점 찾기", "상대 관점 이해하기", "감정 누적 방지"],
    activity: ["토론", "프로젝트 협업", "새 취미 도전", "팀 활동", "여행 계획"],
    fortune: "시간이 지날수록 더 단단해지는 관계 🌱",
    a,
    b,
  };
}

function growthMatch(a: string, b: string): Result {
  return {
    title: "극과 극 자극 케미",
    summary: "서로 다르지만 강한 자극과 배움을 주는 조합이에요.",
    good: ["새로운 시각 제공", "서로에게 자극이 됨", "정체되지 않음"],
    conflict: ["오해 발생 가능성", "속도 차이"],
    tips: ["고치려 하지 말기", "기대치 조절", "거리 유지도 필요"],
    activity: ["여행", "아이디어 토론", "팀 과제", "운동 챌린지", "새 프로젝트"],
    fortune: "서로를 가장 크게 성장시키는 관계 🔥",
    a,
    b,
  };
}

function oppositeMatch(a: string, b: string): Result {
  return {
    title: "예측불가 매력 케미",
    summary: "완전히 다른 성향이라 자극이 강한 조합이에요.",
    good: ["지루할 틈이 없음", "새로운 세계 경험", "강한 임팩트"],
    conflict: ["의사소통 충돌", "생활 리듬 차이"],
    tips: ["간격 유지", "기대치 낮추기", "대화 시간 확보"],
    activity: ["즉흥 여행", "공동 도전", "서로 취미 체험", "단기 협업", "새로운 모임"],
    fortune: "강렬하지만 관리가 필요한 관계 ⚡",
    a,
    b,
  };
}
