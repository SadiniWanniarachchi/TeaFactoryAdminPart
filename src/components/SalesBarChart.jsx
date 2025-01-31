import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesBarChart = () => {
  const data = [
    { name: "Jan", sales: 4000, fill: "#4A774A" },
    { name: "Feb", sales: 3000, fill: "#668F66" },
    { name: "Mar", sales: 2000, fill: "#86A386" },
    { name: "Apr", sales: 800, fill: "#c1D3C0" },
    { name: "May", sales: 4500, fill: "#21501a" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white px-2 py-1 rounded-md text-xs shadow-md">
          {payload[0].value} sales
        </div>
      );
    }
    return null;
  };

  const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 10;

    return (
      <path
        d={`M ${x},${y + height} 
          L ${x},${y + radius} 
          Q ${x},${y} ${x + radius},${y} 
          L ${x + width - radius},${y} 
          Q ${x + width},${y} ${x + width},${y + radius} 
          L ${x + width},${y + height} 
          Z`}
        fill={fill}
      />
    );
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 font-kulim">
      <h2 className="font-bold text-xl text-black mb-4">Tea Product Sales</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barCategoryGap={30} width={650}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 14 }} />
          <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sales" shape={<RoundedBar />} barSize={50} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
