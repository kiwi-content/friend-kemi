const FALLBACK_SITE_URL = "https://friend-kemi.vercel.app";

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const SITE_NAME = "친구 케미 궁합";
export const SITE_DESCRIPTION =
  "사주 오행으로 알아보는 찐친 궁합 테스트. 조별과제부터 찐친까지, 우리 사이 진짜 케미를 확인해봐!";

export const SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
);

export const OG_IMAGE_PATH = "/api/og";
