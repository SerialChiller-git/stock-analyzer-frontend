export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "16px 20px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "13px",
        color: "var(--text)"
      }}
    >
      <div>
        <b style={{ color: "var(--text-h)" }}>WDSE</b> · Dhaka Stock Terminal
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <span style={{ opacity: 0.7 }}>Market Data: DSE</span>
        <span style={{ opacity: 0.7 }}>•</span>
        <span style={{ opacity: 0.7 }}>Alpha Mode</span>
      </div>
    </footer>
  );
}