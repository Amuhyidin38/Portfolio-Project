// src/components/CustomerTable.jsx
import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const CustomerTable = ({ customers }) => {
  const getRiskBadge = (risk) => {
    const configs = {
      High: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
      Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      Low: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
    };
    
    const config = configs[risk];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {risk}
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top At-Risk Customers</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Churn Prob.</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Risk Level</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tenure</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monthly Charges</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contract</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr 
                key={customer.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.id}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div 
                        className={`h-2 rounded-full ${
                          customer.churnProbability > 70 ? 'bg-red-500' :
                          customer.churnProbability > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${customer.churnProbability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {customer.churnProbability}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">{getRiskBadge(customer.risk)}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{customer.tenure} months</td>
                <td className="py-3 px-4 text-sm text-gray-600">${customer.monthlyCharges}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{customer.contractType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;