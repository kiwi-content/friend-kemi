export const dynamic = "force-static";

export async function GET() {
  return new Response(
    "naver-site-verification: naverb945ceee778a02d42858999b38627ee6.html",
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
