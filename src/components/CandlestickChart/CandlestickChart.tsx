// CandlestickChart.tsx
import { useEffect, useRef } from "react";
import axios from "axios";
import { CandlestickSeries, ColorType, createChart } from 'lightweight-charts';


export default function CandlestickChart({ stock }: { stock: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: {
        textColor: "#ffd900",
        background: { type: ColorType.Solid, color: "black" },
      },
      grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const candleStickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });

    candleStickSeries.priceScale().applyOptions({
      borderColor: '#71649C',
      autoScale: true
    });

    chart.timeScale().applyOptions({
      borderColor: '#71649C',
      barSpacing: 12,
      rightOffset: 15
    });

    

    const load = async () => {
      const res = await axios.get(`http://192.168.0.104:5000/api/${stock}/weekly`);

      const candles = res.data;

      const formatted = candles.map((c: any) => ({
      time: new Date(c.date).toISOString().split("T")[0],
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close),
    }));

    candleStickSeries.setData(formatted);
  };
  load();
  return () => chart.remove();
  });
  

  return (
    <div>
      <div ref={containerRef} style={{ width: "80%", height: 600}} />
    </div>
  );
}