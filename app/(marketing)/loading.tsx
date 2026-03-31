export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.45), transparent 24%), linear-gradient(180deg, #c8d6b0 0%, #bece9e 22%, #d6e0c4 48%, #edf2e4 100%)",
      }}
    >
      <div
        className="loading-logo font-extrabold text-[color:var(--ocean-dark)] tracking-[-0.04em]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
      >
        Playa de Pineland
      </div>
      <div className="w-40 h-1 rounded-full bg-[rgba(8,57,72,0.08)] overflow-hidden">
        <div className="loading-shimmer w-[40%] h-full rounded-full" />
      </div>
    </div>
  );
}
