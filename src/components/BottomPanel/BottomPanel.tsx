export default function BottomPanel() {
  return (
    <div
      style={{
        height: "60vh",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-soft, #151922)",
        padding: "16px",
        overflowY: "auto"
      }}
    >
      <h2 style={{ marginBottom: 12, color: "var(--text-h)" }}>
        Market Feed
      </h2>

      {/* fake content for scroll */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: "10px",
            borderBottom: "1px solid var(--border)",
            color: "var(--text)"
          }}
        >
          Trade signal #{i + 1} — DSE movement data...
        </div>
      ))}
    </div>
  );
}