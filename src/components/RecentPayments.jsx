import React from "react";
import { FaMoneyBillWave } from "react-icons/fa"; // Importing React Icon for payment
import { GrMoney } from "react-icons/gr";

const RecentPayments = () => {
  const payments = [
    { name: "Amal Abesinghe", supplierid: "S0023", amount: "$120" },
    { name: "Wimal Perera", supplierid: "S0098", amount: "$150" },
  ];

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="font-bold text-lg text-black mb-6">Recent Payments</h2>
      <ul>
        {payments.map((payment, index) => (
          <li key={index} className="flex items-center space-x-4 mb-4">
            {/* React Icon for Payment */}
            <GrMoney className="text-4xl text-[#21501a]" />
            <div className="flex-1">
              <span className="font-medium text-lg">{payment.name}</span>
              <br />
              <span className="text-sm text-gray-500 text-bold">{payment.supplierid}</span>
            </div>
            <span className="text-lg text-[#21501a] font-bold">{payment.amount}</span>
            <button className="px-4 py-2 border border-gray-400 text-black bg-gray-100 
                       rounded-md transition-all duration-300 ease-in-out
                       hover:bg-black hover:text-white hover:border-black">
                 View
           </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPayments;
