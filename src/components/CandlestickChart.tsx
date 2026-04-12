// CandlestickChart.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { type ApexOptions } from "apexcharts";

export default function CandlestickChart({ stock }: { stock: string }) {
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://192.168.0.104:5000/api/${stock}/weekly`);

      const candles = res.data;

      setSeries([
        {
          data: candles.map((c: any) => ({
            x: new Date(c.date),
            y: [c.open, c.high, c.low, c.close],
          })),
        },
      ]);
    };

    load();
  }, [stock]);

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 400,
    },
    title: {
      text: stock,
    },
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      height={400}
    />
  );
}