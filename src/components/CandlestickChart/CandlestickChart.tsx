// CandlestickChart.tsx
import { useEffect, useRef } from "react";
import axios from "axios";
import { CandlestickSeries, ColorType, createChart , CrosshairMode, LineStyle } from 'lightweight-charts';


export default function CandlestickChart({ stock }: { stock: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        mode: CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
            color: '#C3BCDB44',
            style: LineStyle.Solid,
            labelBackgroundColor: '#9B7DFF',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
        },
    },
      layout: {
        textColor: "#ffd900",
        background: { type: ColorType.Solid, color: "black" },
        panes: {
          enableResize: true,
          separatorColor: '#E0E3EB',
          separatorHoverColor: 'rgba(178, 181, 189, 0.2)',
        },
        attributionLogo: false
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
      lastValueVisible: false,
      priceLineVisible: false
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
    const prices = formatted.flatMap((c:any) => [c.open, c.high, c.low, c.close]);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a:number, b:number) => a + b, 0) / prices.length; 

    
    const minPriceLine = {
        price: minPrice,
        color: '#ef5350',
        lineStyle: 2, // LineStyle.Dashed
        axisLabelVisible: true,
        title: 'min price',
    };
    const avgPriceLine = {
        price: avgPrice,
        color: 'white',
        lineStyle: 1, // LineStyle.Dotted
        axisLabelVisible: true,
        title: 'ave price',
    };
    const maxPriceLine = {
        price: maxPrice,
        color: '#26a69a',
        lineStyle: 2, // LineStyle.Dashed
        axisLabelVisible: true,
        title: 'max price',
    };

    candleStickSeries.createPriceLine(minPriceLine);
    candleStickSeries.createPriceLine(maxPriceLine);
    candleStickSeries.createPriceLine(avgPriceLine);
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