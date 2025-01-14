import React from "react";
import { FaMoneyBillWave } from "react-icons/fa"; // Importing React Icon for payment

const RecentPayments = () => {
  const payments = [
    { name: "Amal Abesinghe", supplierid: "S0023", amount: "$120" },
    { name: "Wimal Perera", supplierid: "S0098", amount: "$150" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="font-bold text-lg text-black mb-6">Recent Payments</h2>
      <ul>
        {payments.map((payment, index) => (
          <li key={index} className="flex items-center space-x-4 mb-4">
            {/* React Icon for Payment */}
            <FaMoneyBillWave className="text-4xl text-gray-600" />
            <div className="flex-1">
              <span className="font-medium text-lg">{payment.name}</span>
              <br />
              <span className="text-sm text-gray-500 text-bold">{payment.supplierid}</span>
            </div>
            <span className="text-lg text-[#21501a] font-medium">{payment.amount}</span>
            <button className="bg-[#21501a] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557] transition">
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPayments;
