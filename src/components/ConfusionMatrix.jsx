// src/components/ConfusionMatrix.jsx
import React from 'react';

const ConfusionMatrix = ({ matrix }) => {
  const { truePositive, trueNegative, falsePositive, falseNegative } = matrix;
  
  const Cell = ({ value, label, bg, highlight }) => (
    <div className={`${bg} ${highlight ? 'ring-2 ring-blue-500' : ''} rounded-lg p-6 text-center transition-all hover:scale-105`}>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confusion Matrix</h3>
      
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div></div>
          <div className="text-center font-semibold text-gray-700">Predicted</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center justify-end pr-4">
            <span className="text-sm font-semibold text-gray-700 transform -rotate-90">Actual</span>
          </div>
          
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="text-center text-sm font-medium text-gray-600">Positive</div>
            <div className="text-center text-sm font-medium text-gray-600">Negative</div>
          </div>
          
          <div className="flex items-center justify-end pr-4">
            <span className="text-sm font-medium text-gray-600">Positive</span>
          </div>
          
          <Cell 
            value={truePositive} 
            label="True Positive" 
            bg="bg-green-50" 
            highlight 
          />
          <Cell 
            value={falseNegative} 
            label="False Negative" 
            bg="bg-red-50" 
          />
          
          <div className="flex items-center justify-end pr-4">
            <span className="text-sm font-medium text-gray-600">Negative</span>
          </div>
          
          <Cell 
            value={falsePositive} 
            label="False Positive" 
            bg="bg-yellow-50" 
          />
          <Cell 
            value={trueNegative} 
            label="True Negative" 
            bg="bg-green-50" 
            highlight 
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Interpretation:</strong> The model correctly predicted {truePositive} churns and {trueNegative} retentions, 
          with {falsePositive} false alarms and {falseNegative} missed churns.
        </p>
      </div>
    </div>
  );
};

export default ConfusionMatrix;