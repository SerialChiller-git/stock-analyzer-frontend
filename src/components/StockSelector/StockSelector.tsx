import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import CandlestickChart from "../CandlestickChart/CandlestickChart";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function StockSelector() {
  const [stock, setStock] = useState("ACI");
  const [stocks, setStocks] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const loadStocks = async () => {
      const { data, error } = await supabase
        .from("stocks")
        .select("symbol");

      if (error) {
        console.error(error);
        return;
      }

      setStocks(data);
    };

    loadStocks();
  }, []);

    const filtered = stocks.filter((s) =>
    s.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ position: "relative", width: 250 }}>
      <input
        value={query}
        placeholder="Search symbol..."
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #444",
          borderRadius: "6px",
        }}
      />

      {/* Dropdown */}
      {open && query && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#111",
            border: "1px solid #333",
            maxHeight: 200,
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <div
                key={s.symbol}
                onClick={() => {
                  setStock(s.symbol);
                  setQuery(s.symbol);
                  setOpen(false);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #222",
                }}
              >
                {s.symbol}
              </div>
            ))
          ) : (
            <div style={{ padding: "8px", color: "#888" }}>
              No results
            </div>
          )}
        </div>
      )}

      {/* Selected display */}
      <div style={{ marginTop: 10 }}>
        Current chart: <b>{stock || "none"}</b>
        
      </div>
        <div style={{
            
            }}>
             <CandlestickChart stock={stock} />
        </div>
    </div>
  );
}