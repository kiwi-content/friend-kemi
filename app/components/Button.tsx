"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
};

export default function Button({ children, onClick, full }: Props) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:scale-105 hover:shadow-lg transition-all duration-300 ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}
