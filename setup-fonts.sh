#!/bin/bash
# FriendKemi 폰트 설치 스크립트 (수정된 URL)
# 프로젝트 루트에서 실행: bash setup-fonts.sh

mkdir -p public/fonts

echo "⬇️  Cafe24 Ssurround (Bold) 다운로드 중..."
curl -L -o public/fonts/Cafe24Ssurround.woff2 \
  "https://cdn.jsdelivr.net/gh/fonts-archive/Cafe24Ssurround/Cafe24Ssurround.woff2"

echo "⬇️  Cafe24 SsurroundAir (Light) 다운로드 중..."
curl -L -o public/fonts/Cafe24SsurroundAir.woff2 \
  "https://cdn.jsdelivr.net/gh/fonts-archive/Cafe24SsurroundAir/Cafe24SsurroundAir.woff2"

# 파일 확인
echo ""
echo "📁 다운로드 결과:"
ls -la public/fonts/

echo ""
echo "✅ 설치 완료! npm run dev 로 확인하세요."
echo ""
echo "만약 파일이 비어있다면 아래 링크에서 직접 다운로드:"
echo "  Bold: https://cdn.jsdelivr.net/gh/fonts-archive/Cafe24Ssurround/Cafe24Ssurround.woff2"
echo "  Air:  https://cdn.jsdelivr.net/gh/fonts-archive/Cafe24SsurroundAir/Cafe24SsurroundAir.woff2"
