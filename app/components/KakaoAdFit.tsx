"use client";

import { useEffect, useRef } from "react";

interface Props {
  unit: string;
  width: number;
  height: number;
}

export default function KakaoAdFit({ unit, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", unit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));
    ref.current.appendChild(ins);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;
    ref.current.appendChild(script);
  }, [unit, width, height]);

  return <div ref={ref} className="flex justify-center my-6" />;
}
