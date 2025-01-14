import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesBarChart = () => {
  // Sample data for tea products and their sales
  const data = [
    { name: 'Black Tea', sales: 4000 },
    { name: 'Green Tea', sales: 2800 },
    { name: 'Herbal Tea', sales: 2000 },
    { name: 'Oolong Tea', sales: 1500 },
    { name: 'White Tea', sales: 3500 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-semibold text-xl text-black mb-6">Tea Product Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#21501a" barSize={25} /> {/* Adjust barSize to reduce the width */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
