"use client";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex">{children}</div>;
}
