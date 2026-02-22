"use client";

type Props = {
  title: string;
  subtitle?: string;
};

export default function ShareBar({ title, subtitle }: Props) {
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  const nativeShare = async () => {
    try {
      if (!navigator.share) return copyLink();
      await navigator.share({
        title,
        text: "친구 케미 궁합 결과",
        url: window.location.href,
      });
    } catch {
      // 사용자 취소 등은 무시
    }
  };

  const saveImage = async () => {
    // 간단/안정적인 캔버스 렌더 방식 (외부 라이브러리 없이)
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#F6F2FF");
    grad.addColorStop(1, "#E9E6FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Glow
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = "#C4B5FD";
    ctx.beginPath();
    ctx.arc(540, 210, 260, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Icon circle
    const iconGrad = ctx.createLinearGradient(420, 280, 660, 520);
    iconGrad.addColorStop(0, "#C4B5FD");
    iconGrad.addColorStop(1, "#7C3AED");
    ctx.fillStyle = iconGrad;
    roundRect(ctx, 420, 240, 240, 240, 120);
    ctx.fill();

    // puzzle blocks
    ctx.fillStyle = "#9AE6B4";
    roundRect(ctx, 480, 325, 78, 78, 22);
    ctx.fill();
    ctx.fillStyle = "#C4B5FD";
    roundRect(ctx, 522, 325, 78, 78, 22);
    ctx.fill();

    // Title (gradient-like by two draws)
    ctx.textAlign = "center";
    ctx.fillStyle = "#7C3AED";
    ctx.font = "800 72px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.fillText(title, 540, 610);

    // Subtitle
    if (subtitle) {
      ctx.fillStyle = "#6B7280";
      ctx.font = "600 40px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      ctx.fillText(subtitle, 540, 685);
    }

    // Body
    ctx.fillStyle = "#374151";
    ctx.font = "500 34px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    wrapText(
      ctx,
      "사주 오행으로 보는 친구 케미 궁합",
      540,
      780,
      820,
      46
    );

    // Footer badge
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    roundRect(ctx, 240, 1120, 600, 120, 32);
    ctx.fill();
    ctx.fillStyle = "#7C3AED";
    ctx.font = "700 34px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.fillText("friend-kemi", 540, 1195);

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "friend-kemi-result.png";
    a.click();
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg mb-10 text-center">
      <h3 className="font-semibold text-[#7C3AED] mb-4">결과 공유하기 ✨</h3>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={nativeShare}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white font-semibold hover:scale-[1.02] transition"
        >
          공유하기
        </button>

        <button
          onClick={copyLink}
          className="px-6 py-3 rounded-full bg-white text-[#7C3AED] font-semibold shadow hover:bg-[#F5F3FF] transition"
        >
          링크 복사
        </button>

        <button
          onClick={saveImage}
          className="px-6 py-3 rounded-full bg-white text-[#7C3AED] font-semibold shadow hover:bg-[#F5F3FF] transition"
        >
          이미지 저장 (PNG)
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        본 테스트는 재미로 보는 콘텐츠이며 실제 관계를 단정하지 않습니다.
      </p>
    </div>
  );
}

/** helpers */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let y = startY;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), centerX, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), centerX, y);
}
